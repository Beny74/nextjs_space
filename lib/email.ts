
import nodemailer from 'nodemailer'

// Create transporter with Gmail configuration
const createTransporter = () => {
  // If email credentials are not provided, return a test transporter
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email credentials not configured. Using test account.')
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@test.com',
        pass: 'test',
      },
    })
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

interface QuoteRequestData {
  name: string
  phone: string
  address?: string | null
  service: string
  size?: string | null
  date?: string | null
  notes?: string | null
}

export async function sendQuoteRequestEmail(data: QuoteRequestData) {
  const transporter = createTransporter()
  
  const emailContent = `
    <h2>Nova Solicitação de Orçamento - Gabi Cleaning</h2>
    
    <h3>Informações do Cliente:</h3>
    <ul>
      <li><strong>Nome:</strong> ${data.name}</li>
      <li><strong>Telefone:</strong> ${data.phone}</li>
      ${data.address ? `<li><strong>Endereço:</strong> ${data.address}</li>` : ''}
    </ul>
    
    <h3>Detalhes do Serviço:</h3>
    <ul>
      <li><strong>Tipo de Limpeza:</strong> ${data.service}</li>
      ${data.size ? `<li><strong>Tamanho do Imóvel:</strong> ${data.size}</li>` : ''}
      ${data.date ? `<li><strong>Data Preferida:</strong> ${data.date}</li>` : ''}
    </ul>
    
    ${data.notes ? `
    <h3>Notas Adicionais:</h3>
    <p>${data.notes}</p>
    ` : ''}
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Este e-mail foi enviado automaticamente pelo formulário de solicitação de orçamento do site Gabi Cleaning.
    </p>
  `
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@gabicleaning.com',
      to: 'gabifcleaning@gmail.com',
      subject: `Nova Solicitação de Orçamento - ${data.name}`,
      html: emailContent,
      replyTo: data.phone.includes('@') ? data.phone : undefined,
    })
    
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
