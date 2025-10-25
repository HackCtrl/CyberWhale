// Simple email simulation service for development
// In production, this would send real emails

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export class EmailService {
  private static instance: EmailService;
  private verificationCodes: Map<string, { code: string; expires: Date }> = new Map();

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Generate 6-digit verification code
  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Simulate sending email by logging to console
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      console.log('\n=== EMAIL ОТПРАВЛЕН ===');
      console.log(`Кому: ${emailData.to}`);
      console.log(`Тема: ${emailData.subject}`);
      console.log(`Сообщение: ${emailData.text}`);
      console.log('=====================\n');
      
      // In development, we'll also show this in the response
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  }

  async sendVerificationEmail(email: string, code: string): Promise<boolean> {
    const emailData: EmailData = {
      to: email,
      subject: 'CyberWhale - Подтверждение регистрации',
      text: `Ваш код подтверждения: ${code}\n\nВведите этот код на сайте для завершения регистрации.\n\nКод действителен 15 минут.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">CyberWhale - Подтверждение регистрации</h2>
          <p>Добро пожаловать в CyberWhale!</p>
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="color: #2d3748;">Ваш код подтверждения:</h3>
            <div style="font-size: 32px; font-weight: bold; color: #3182ce; letter-spacing: 8px;">${code}</div>
          </div>
          <p>Введите этот код на сайте для завершения регистрации.</p>
          <p style="color: #718096; font-size: 14px;">Код действителен 15 минут.</p>
        </div>
      `
    };

    return await this.sendEmail(emailData);
  }

  async sendPasswordResetEmail(email: string, code: string): Promise<boolean> {
    const emailData: EmailData = {
      to: email,
      subject: 'CyberWhale - Восстановление пароля',
      text: `Код для восстановления пароля: ${code}\n\nВведите этот код на сайте для сброса пароля.\n\nКод действителен 15 минут.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">CyberWhale - Восстановление пароля</h2>
          <p>Вы запросили восстановление пароля.</p>
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h3 style="color: #2d3748;">Код для восстановления:</h3>
            <div style="font-size: 32px; font-weight: bold; color: #e53e3e; letter-spacing: 8px;">${code}</div>
          </div>
          <p>Введите этот код на сайте для сброса пароля.</p>
          <p style="color: #718096; font-size: 14px;">Код действителен 15 минут.</p>
        </div>
      `
    };

    return await this.sendEmail(emailData);
  }

  // Store verification code temporarily (in production, use Redis or similar)
  storeVerificationCode(email: string, code: string): void {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15); // 15 minutes expiry
    this.verificationCodes.set(email, { code, expires });
  }

  // Verify code
  verifyCode(email: string, inputCode: string): boolean {
    const stored = this.verificationCodes.get(email);
    if (!stored) return false;
    
    if (new Date() > stored.expires) {
      this.verificationCodes.delete(email);
      return false;
    }
    
    if (stored.code === inputCode) {
      this.verificationCodes.delete(email);
      return true;
    }
    
    return false;
  }
}

export const emailService = EmailService.getInstance();