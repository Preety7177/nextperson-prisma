import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient({datasources: {
    db: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
  }});

export async function GET(req: NextRequest, res: NextResponse) {
    const people = await prisma.person.findMany();
    return new Response(JSON.stringify(people), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { firstname, lastname, phone, dob } = body;
        if (!firstname || !lastname || !phone || !dob) {
            return new Response('Missing required fields', {
                status: 400,
            })
        }
        
        const person = await prisma.person.create({
            data: {
                firstname,
                lastname,
                phone,
                dob: new Date(dob).toISOString()
            }
        })

        //return the data record
        return new Response(JSON.stringify(person), {
            status: 202,
        })

    } catch (error) {
        return new Response('Error', {
            status: 500,
        })
        
    }


}
