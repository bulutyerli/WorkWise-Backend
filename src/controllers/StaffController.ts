import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';
import {
  countStaff,
  deleteStaffById,
  fetchAllStaff,
  fetchCurrentBirthdays,
  fetchNewJoins,
  findStaffById,
  getStaffUid,
  insertStaff,
  updateStaffById,
} from '../repositories/staffRepository';
import { staffSchema, staffUpdateSchema } from '../schemas/staffSchema';
import { OrderType } from '../types/types';
import { staffType } from '../types/database.type';
import { auth } from '../config/firebaseConfig';
import NameFormatter from '../utils/NameFormatter';

export async function getStaffByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);

  try {
    const staff = await findStaffById(id);

    if (!staff) {
      return next(new ErrorHandler(404, 'Staff ID Not Found'));
    }
    res.json(staff);
  } catch (error) {
    next(error);
  }
}

export async function getAllStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filters: Record<string, string | null> = req.query as Record<
      string,
      string | null
    >;
    const sortFilters = {
      order: req.query.order as OrderType,
      direction: req.query.direction as 'asc' | 'desc',
    };

    const limit = 15;
    const page = parseInt(req.query.page as string);
    const offset = (page - 1) * limit;
    const [{ total_staff }] = await countStaff(filters);
    const totalPages = Math.ceil(total_staff / limit);
    const staff = await fetchAllStaff(offset, limit, filters, sortFilters);
    const hasMore = page < totalPages;
    if (!staff) {
      return next(new ErrorHandler(404, 'Could not get the staff data'));
    }

    res.json({
      success: true,
      totalPages,
      totalStaff: total_staff,
      hasMore: hasMore,
      data: staff,
    });
  } catch (error) {
    next(error);
  }
}

export async function createNewStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      name,
      surname,
      phone,
      birthday,
      office,
      department,
      shift,
      role,
      manager_id,
      join_date,
      salary,
      email,
      password,
    } = req.body;
    const parsedJoindate = new Date(join_date);
    const parsedBirthday = new Date(birthday);
    const newUserName = `${name} ${surname}`;

    const formattedName = NameFormatter(name);
    const formattedSurname = NameFormatter(surname);

    //create firebase user
    const newUser = await auth.createUser({
      email,
      emailVerified: false,
      password,
      displayName: newUserName,
    });

    if (newUser) {
      const staffData: staffType = {
        name: formattedName,
        surname: formattedSurname,
        phone,
        birthday: parsedBirthday,
        office_id: Number(office),
        department_id: Number(department),
        shift_id: Number(shift),
        role_id: Number(role),
        manager_id: Number(manager_id),
        join_date: parsedJoindate,
        salary: Number(salary),
        email,
        firebase_id: newUser.uid,
      };

      const newData = staffSchema.parse(staffData);

      await insertStaff(newData);
      res
        .status(201)
        .json({ success: true, message: 'Staff member created successfully' });
    } else {
      throw new Error('Could not create user');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function deleteStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const user = await getStaffUid(id);

    if (user?.firebase_id) {
      await auth.deleteUser(user?.firebase_id.toString());
      await deleteStaffById(id);
    }

    res
      .status(200)
      .json({ success: true, message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    next(error);
  }
}

export async function updateStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const staffData = staffUpdateSchema.parse(req.body);

    await updateStaffById(id, staffData);
    res
      .status(200)
      .json({ success: true, message: 'Staff member updated successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getStaffDates(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const birthdayWeek = [];
    for (let day = currentDay; day < currentDay + 3; day++) {
      birthdayWeek.push(day);
    }

    const [birthdays, newJoins] = await Promise.all([
      fetchCurrentBirthdays(currentMonth, birthdayWeek),
      fetchNewJoins(),
    ]);
    res.status(200).json({ birthdays, newJoins });
  } catch (error) {
    next(error);
  }
}
