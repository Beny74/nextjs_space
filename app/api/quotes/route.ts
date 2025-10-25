
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendQuoteRequestEmail } from '@/lib/email'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, address, service, size, date, notes } = body

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    // Create quote request in database
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name: name?.trim() ?? '',
        phone: phone?.trim() ?? '',
        address: address?.trim() || null,
        service: service ?? 'Regular',
        size: size || null,
        date: date || null,
        notes: notes?.trim() || null,
      },
    })

    // Send email notification
    try {
      await sendQuoteRequestEmail({
        name: name?.trim() ?? '',
        phone: phone?.trim() ?? '',
        address: address?.trim() || null,
        service: service ?? 'Regular',
        size: size || null,
        date: date || null,
        notes: notes?.trim() || null,
      })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // Continue even if email fails - quote is still saved in database
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully',
        id: quoteRequest?.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const quotes = await prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ quotes }, { status: 200 })
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}
