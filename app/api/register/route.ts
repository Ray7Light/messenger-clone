import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

type fieldErrors = {
  email?: string;
  name?: string;
  password?: string;
};

const REQUIRED_MSG = 'Required field.';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      let errors: fieldErrors = {};

      if (!email) {
        errors.email = REQUIRED_MSG;
      }

      if (!name) {
        errors.name = REQUIRED_MSG;
      }

      if (!password) {
        errors.password = REQUIRED_MSG;
      }

      return NextResponse.json(errors, { status: 400 });
    }

    const registeredEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredEmail) {
      return NextResponse.json(
        { email: 'This email is already in use.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, 'REGISTRATION ERROR');
    return new NextResponse('Internal error', { status: 500 });
  }
}
