import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido.' },
        { status: 400 }
      );
    }

    // Process contact form...
    
    return NextResponse.json(
      { message: 'Tu mensaje ha sido enviado correctamente.' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Ha ocurrido un error al procesar tu solicitud.' },
      { status: 500 }
    );
  }
}
