# CyberWhale - Инновационная платформа кибербезопасности 2025

## Overview

CyberWhale - это российская инновационная платформа кибербезопасности, где пользователи создают и прокачивают эволюционирующих аватаров-хакеров, которые становятся ИИ-стражами. Платформа объединяет геймифицированное обучение, практические CTF тренажеры, персональную защиту от современных угроз и услуги аудита для бизнеса.

### Уникальные особенности
- **Эволюционирующие аватары**: Каждый пользователь создает уникального аватара-хакера с прокачкой через XP
- **ИИ-ассистент CyberSentinel**: Персональный страж на базе YandexGPT с интеграцией российских баз данных
- **Прогрессивный доступ**: Материалы разблокируются через развитие аватара (Lvl 1-5 базовые, Lvl 6-10 продвинутые, Lvl 11+ элитные)
- **Локализованная защита**: Интеграция с российскими стандартами (152-ФЗ, ГосСОПКА) и базами данных (Роскомнадзор, МВД)

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom cybersecurity-themed dark mode design
- **State Management**: TanStack React Query for server state, React Context for auth
- **Routing**: React Router DOM for client-side navigation
- **Internationalization**: react-i18next for multi-language support (Russian/English)

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon (serverless PostgreSQL)
- **Session Management**: In-memory storage with planned database persistence
- **API Structure**: RESTful API with `/api` prefix

### Authentication System
- **Provider**: Supabase Auth with custom user profiles
- **Features**: 
  - Email/password authentication
  - Social login support (prepared)
  - Email verification
  - Password reset functionality
  - OTP verification
- **Session Management**: JWT tokens with automatic refresh

## Key Components

### Модули платформы CyberWhale

#### 1. Система аватаров и эволюции
- **WebGL редактор**: Создание уникального аватара-хакера (киберпанк-стиль, неоновые элементы)
- **Система прокачки**: XP через миссии, CTF, ежедневные квесты
- **Уровни доступа**: 
  - Lvl 1-5: Базовые скилы ("Антиспам-фильтр")
  - Lvl 6-10: Продвинутые ("Анализ дипфейков") 
  - Lvl 11+: Элитные ("Предиктивная защита")
- **Инвентарь**: "Неоновая крипто-броня", "Матричный плащ", ИИ-гаджеты
- **Монетизация**: Микротранзакции (200₽ ускорители XP, 500₽ редкие items)

#### 2. CyberSentinel - ИИ-страж
- **YandexGPT интеграция**: Персональный ИИ-ассистент
- **Анализ угроз**: Проверка ссылок, файлов, звонков
- **Российские базы**: Интеграция с Роскомнадзором, МВД
- **Адаптивность**: Изучение паттернов пользователя, предсказание рисков
- **Подписка**: Базовые проверки бесплатно, премиум (1000₽/мес) - безлимитный анализ

#### 3. Образовательная экосистема
- **CTF Arena**: Турниры с трансляциями и уникальными наградами  
- **Миссии**: Адаптивные курсы с российскими кейсами
- **Категории**: Web, Crypto, OSINT, Steganography, Reverse Engineering, Forensics, PWN, Network Security
- **Прогрессивный контент**: Разблокировка через развитие аватара

#### 4. Сообщество и карьера
- **Чаты**: Дуэли аватаров, техническое общение
- **Резюме**: Экспорт достижений для ИБ-вакансий
- **Рейтинги**: Турнирные таблицы и достижения

## Data Flow

1. **Authentication Flow**: 
   - User registration/login via Supabase Auth
   - Profile creation/retrieval from database
   - Session management with JWT tokens

2. **Challenge Flow**:
   - Challenge listing with filtering/search
   - Individual challenge access with authentication check
   - Progress tracking and point accumulation

3. **AI Assistant Flow**:
   - Message sent to Supabase Edge Function
   - Function calls Hugging Face API
   - Response processed and returned to client

4. **Content Management**:
   - Static content served from client
   - Dynamic content managed through mock data (prepared for database)

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (serverless)
- **Authentication**: Supabase (auth, storage, edge functions)
- **AI/ML**: Hugging Face Inference API
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **Build Tools**: Vite, esbuild for production builds

### Development Dependencies
- **Language**: TypeScript
- **Linting**: ESLint (configured via package.json)
- **Package Manager**: npm
- **Development Server**: tsx for TypeScript execution

### Third-party Services
- **CDN/Assets**: Potential external file hosting for challenge files
- **Email**: Configured through Supabase for auth emails
- **Analytics**: Prepared for integration (no current implementation)

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 and PostgreSQL 16 modules
- **Port Configuration**: Internal port 5000, external port 80
- **Hot Reload**: Vite HMR with middleware mode
- **Database**: Neon serverless PostgreSQL with connection pooling

### Production Deployment
- **Build Process**: 
  1. Vite builds client-side React application
  2. esbuild bundles server-side Express application
  3. Static assets served from `dist/public`
- **Runtime**: Node.js production server serving both API and static files
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: DATABASE_URL, Supabase keys, Hugging Face API key

### Infrastructure Considerations
- **Scaling**: Serverless-ready architecture with Neon database
- **Security**: Environment-based configuration, secure session management
- **Monitoring**: Basic error handling with planned enhancement

## План поэтапной разработки CyberWhale 2025

### Этап 1: MVP - Фундамент (Q3 2025) ✅ ТЕКУЩИЙ ЭТАП
**Цель**: Создать базовую инфраструктуру и первые компоненты

#### Завершено:
- ✅ Базовая архитектура (React + Node.js + PostgreSQL)
- ✅ JWT аутентификация с email подтверждением
- ✅ Админ панель (пароль: 301062Ki)
- ✅ Интеграция официального логотипа CyberWhale

#### В разработке:
- 🔄 Система регистрации с созданием аватара
- 🔄 Базовый WebGL редактор аватаров
- 🔄 Система XP и прокачки (уровни 1-5)
- 🔄 Первые CTF задания (3-5 базовых)

### Этап 2: Аватары и геймификация (Q4 2025)
**Цель**: Реализовать уникальную систему аватаров

#### Запланировано:
- 📋 WebGL редактор с киберпанк-элементами
- 📋 Система инвентаря и одежды
- 📋 Алгоритм эволюции аватара (Lvl 1-10)
- 📋 Базовые микротранзакции (200₽ ускорители)
- 📋 Первые 15-20 CTF заданий разных категорий

### Этап 3: CyberSentinel ИИ-страж (Q1 2026) 
**Цель**: Интеграция ИИ-ассистента

#### Запланировано:
- 📋 YandexGPT API интеграция
- 📋 Анализ ссылок и файлов на угрозы
- 📋 Интеграция с российскими базами данных
- 📋 Премиум подписка CyberSentinel (1000₽/мес)
- 📋 Персональная адаптация ИИ

### Этап 4: Полная экосистема (Q2 2026)
**Цель**: Завершенная платформа с монетизацией

#### Запланировано:  
- 📋 CTF Arena с турнирами и трансляциями
- 📋 Продвинутые уровни аватара (Lvl 11+)
- 📋 Система чатов и дуэлей
- 📋 Экспорт резюме для ИБ-вакансий
- 📋 Услуги аудита для малого бизнеса

### Этап 5: Масштабирование (Q3-Q4 2026)
**Цель**: Рост до 50,000+ пользователей

#### Запланировано:
- 📋 Мобильное приложение
- 📋 Партнерства с ИБ-компаниями  
- 📋 Государственные контракты
- 📋 Международная экспансия

## Технические требования MVP

### Backend API Endpoints (приоритет 1):
```
POST /api/auth/register - регистрация с созданием аватара
POST /api/auth/verify-email - подтверждение email
GET /api/user/avatar - получение данных аватара
PUT /api/user/avatar - обновление аватара
GET /api/ctf/challenges - список заданий
POST /api/ctf/submit - отправка решения
PUT /api/user/xp - начисление опыта
```

### Схема базы данных (приоритет 1):
```sql
users: id, email, username, password, verified, avatar_data, level, xp
avatars: id, user_id, name, appearance, items, stats
challenges: id, title, description, category, difficulty, points, flag
user_progress: user_id, challenge_id, completed, attempts
```

### Frontend компоненты (приоритет 1):
- AvatarCreator - создание и редактирование аватара
- CTFChallengePage - интерфейс решения заданий  
- XPProgressBar - отображение прогресса
- LevelUpModal - уведомления о повышении уровня

## Changelog

- Август 17, 2025: Создан детальный план разработки на основе бизнес-плана CyberWhale 2025
- Август 17, 2025: Интегрирован официальный логотип в навигацию
- June 27, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.