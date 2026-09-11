# NomNom Monorepo — Бүх кодын тайлбар

Энэ файл `monorepo-food` төслийн **бүх гол код**-ыг монгол хэлээр тайлбарлана.

Төсөл 2 хэсэгтэй:

| Хавтас | Зориулалт |
|--------|-----------|
| `food-back/` | Express + MongoDB API (сервер) |
| `food-front/` | Next.js вэб апп (хэрэглэгч + admin) |

---

## Агуулга

1. [Төслийн ерөнхий зураглал](#1-төслийн-ерөнхий-зураглал)
2. [food-back — Сервер](#2-food-back--сервер)
3. [food-front — Frontend](#3-food-front--frontend)
4. [Auth урсгал (бүртгэл / нэвтрэлт)](#4-auth-урсгал)
5. [Захиалгын урсгал](#5-захиалгын-урсгал)
6. [JWT болон `"naba"`](#6-jwt-болон-naba)
7. [Environment хувьсагчид](#7-environment-хувьсагчид)
8. [Файлуудын жагсаалт](#8-файлуудын-жагсаалт)

---

## 1. Төслийн ерөнхий зураглал

```
Хэрэглэгч (browser)
        ↓
  food-front (Next.js)
        ↓  fetch(NEXT_PUBLIC_API_URL + path)
  food-back (Express)
        ↓
  MongoDB (Mongoose models)
```

- **Хэрэглэгч**: хоол үзэх → сагсанд хийх → нэвтрэх → захиалах
- **Admin**: хоол/категори удирдах → захиалгын төлөв солих/устгах

---

## 2. food-back — Сервер

### 2.1 Entry — `src/index.js`

- Express app үүсгэнэ
- CORS нээнэ
- `dotenv` ачаална
- MongoDB холболт хийнэ (`MONGODB_URL`)
- Route-уудыг холбоно:
  - `/category` → categoryRouter
  - `/food` → foodRouter
  - `/order` → orderRouter
  - `/user` → userRouter
- Local дээр порт `8000` сонсоно; Vercel дээр `VERCEL` байвал `listen` хийхгүй

---

### 2.2 Models (DB бүтэц)

#### `models/user-model.js` — Хэрэглэгч

| Талбар | Утга |
|--------|------|
| `email` | Имэйл (unique) |
| `password` | bcrypt hash |
| `name`, `phoneNumber`, `address` | Профайл |
| `role` | `USER` эсвэл `ADMIN` |
| `resetCode`, `ttl` | Нууц үг сэргээх код + хугацаа |
| `orderedFoods` | Захиалсан хоолны ref |

#### `models/food-model.js` — Хоол

- `foodName`, `price`, `image`, `ingredients`
- `category` → Category-тай холбоотой

#### `models/category.js` — Категори

- `categoryName`
- timestamps

#### `models/order-model.js` — Захиалга

| Талбар | Утга |
|--------|------|
| `user` | Хэн захиалсан |
| `totalPrice` | Нийт үнэ |
| `foodOrderItems` | `{ food, foodName, image, quantity }` |
| `address` | Хүргэлтийн хаяг |
| `status` | `PENDING` / `DELIVERED` / `CANCELED` |
| `createdAt`, `updatedAt` | Огноо |

---

### 2.3 Routes (API хаягууд)

#### User — `routes/user.js` → `/user`

| Method | Path | Юу хийдэг |
|--------|------|-----------|
| GET | `/user/` | Бүх хэрэглэгч авах |
| POST | `/user/` | Бүртгэл үүсгэх |
| POST | `/user/signup` | Бүртгэл (ижил) |
| POST | `/user/login` | Нэвтрэх + JWT token |
| POST | `/user/forgot-password` | Сэргээх код өгөх |
| POST | `/user/reset-password` | Шинэ нууц үг тавих |
| PUT | `/user/` | Хэрэглэгч шинэчлэх |
| DELETE | `/user/` | Хэрэглэгч устгах |

#### Food — `routes/food.js` → `/food`

| Method | Path | Юу хийдэг |
|--------|------|-----------|
| GET | `/food/` | Бүх хоол |
| POST | `/food/` | Хоол нэмэх |
| PUT | `/food/` | Хоол засах |
| DELETE | `/food/` | Хоол устгах |

#### Category — `routes/category.js` → `/category`

| Method | Path | Юу хийдэг |
|--------|------|-----------|
| GET | `/category/` | Категори + тоо |
| GET | `/category/:categoryId` | Тухайн категори дахь хоол |
| POST | `/category/` | Категори нэмэх |
| PUT | `/category/` | Нэр солих |
| DELETE | `/category/` | Устгах |

#### Order — `routes/order.js` → `/order`

| Method | Path | Юу хийдэг |
|--------|------|-----------|
| GET | `/order/?page&limit&from&to` | Захиалга (хуудас + огноо шүүлт) |
| POST | `/order/` | Захиалга үүсгэх |
| PUT | `/order/` | Төлөв солих (нэг/олон) |
| DELETE | `/order/` | Устгах (нэг/олон) |

---

### 2.4 Resolvers — User

#### `auth-utils.js`

```js
JWT_SECRET = "naba"   // серверийн тамганы нууц
createToken(user)     // jwt.sign → token үүсгэнэ (7 хоног)
toPublicUser(user)    // passwordгүй user объект буцаана
```

#### `login-user.js` — `POST /user/login`

1. Email-ээр user хайна
2. `bcrypt.compare` — нууц үг шалгана
3. Амжилттай бол JWT token үүсгэнэ (`"naba"`-аар тамгална)
4. `{ message, token, user }` буцаана

#### `create-user.js` — Бүртгэл

1. Email/password шаардлагатай
2. Давхардсан email → 409
3. Password-ийг `bcrypt.hash`-ээр хадгална
4. Default role = `USER`
5. Token өгдөггүй (frontend дараа нь login дуудна)

#### `forgot-password.js`

- 6 оронтой код үүсгэж DB-д хадгална
- 15 минутын `ttl`
- Email service байхгүй тул response-д `code` буцаана (тестэд)

#### `reset-password.js`

- Email + code + шинэ password шалгана
- Код/TTL зөв бол шинэ password hash хийж хадгална

#### `get-user.js` / `update-user.js` / `delete-user.js`

- Жагсаалт авах / ID-аар засах / устгах

---

### 2.5 Resolvers — Food / Category / Order

**Food:** create, get (category populate), update, delete, get-by-category

**Category:** create, get (+ food count), update, delete

**Order:**

| Файл | Зориулалт |
|------|-----------|
| `create-order.js` | Захиалга үүсгэх (user, items, total, address, status) |
| `get-order.js` | Хуудаслалт + `from`/`to` огноогоор шүүх |
| `update-order.js` | `id` эсвэл `ids` + status шинэчлэх |
| `delete-order.js` | `id` эсвэл `ids`-аар устгах |

---

## 3. food-front — Frontend

### 3.1 Хуудсууд (App Router)

| Route | Файл | Зориулалт |
|-------|------|-----------|
| `/` | `app/page.tsx` | Хоолны цэс (категориор) |
| `/login` | `app/login/page.tsx` | Нэвтрэх |
| `/signup` | `app/signup/page.tsx` | Бүртгэл (2 алхам) |
| `/forgot-password` | `app/forgot-password/page.tsx` | Нууц үг сэргээх (3 алхам) |
| `/admin` | `app/admin/page.tsx` | → `/admin/orders` руу чиглүүлнэ |
| `/admin/orders` | `app/admin/orders/page.tsx` | Захиалга удирдах |
| `/admin/food-menu` | `app/admin/food-menu/page.tsx` | Хоол/категори удирдах |

`app/admin/layout.tsx` → бүх admin хуудсыг `AdminGuard`-аар хамгаална.

---

### 3.2 Lib файлууд

#### `lib/api.ts`

```ts
apiUrl("/order") → NEXT_PUBLIC_API_URL + "/order"
```

Backend хаягийг нэг газраас бүрдүүлнэ.

#### `lib/auth.ts`

| Функц | Юу хийдэг |
|-------|-----------|
| `saveAuth(token, user)` | localStorage-д хадгална |
| `clearAuth()` | Logout — устгана |
| `getToken()` | Token авна |
| `getStoredUser()` | User JSON авна |
| `isLoggedIn()` | Token байвал true |
| `isAdmin()` | Token + role === ADMIN |

#### `lib/utils.ts`

- `cn()` — Tailwind class нэгтгэх

---

### 3.3 Гол component-үүд (`app/_components/`)

| Файл | Зориулалт |
|------|-----------|
| `providers.tsx` | `CartProvider`-аар аппыг орооно |
| `cart-context.tsx` | Сагс + `placeOrder()` → `POST /order` |
| `header.tsx` | Дээд цэс, сагс, профайл |
| `OrderDetailSheet.tsx` | Сагс / checkout / захиалгын түүх |
| `menuContainer.tsx` / `menuContainerCard.tsx` | Хоолны жагсаалт, карт |
| `FoodImage.tsx` | Зураг + алдааны placeholder |
| `foodAddedModal.tsx` | Сагсанд нэмэх modal |
| `UserProfileDropdown.tsx` | Профайл / logout |
| `footer.tsx` | Доод хэсэг |
| `LoadingSpinner.tsx` | Ачааллын спиннер |

---

### 3.4 Auth хуудсууд

#### Login — `app/login/_features/LoginForm.tsx`

1. Email + password шалгана
2. `POST /user/login`
3. `saveAuth(token, user)`
4. `/` руу орно

#### Signup — `app/signup/`

1. **SignUpSec1** — email
2. **SignUpSec2** — password
3. `POST /user` → бүртгэл
4. `POST /user/login` → шууд нэвтрэнэ
5. `saveAuth` → `/` руу орно

#### Forgot password — `app/forgot-password/`

1. Email → код авах
2. Код оруулах
3. Шинэ password → `POST /user/reset-password`

---

### 3.5 Admin

#### `AdminGuard.tsx`

```
Token байхгүй → /login
role !== ADMIN → /
ADMIN → children харуулна
```

Зөвхөн браузер дээр шалгана (client-side guard).

#### Sidebar

- Food menu
- Orders

#### Orders хуудас — гол функцүүд

| Feature | Файл | Юу хийдэг |
|---------|------|-----------|
| Хүснэгт | `OrdersTable.tsx` | Захиалгын мөр, food dropdown, устгах товч |
| Төлөв | `StatusBadge.tsx` | Pending/Delivered/Cancelled dropdown |
| Олноор төлөв | `ChangeDeliveryStateModal.tsx` | Сонгосон захиалгын төлөв солих |
| Устгах | `DeleteOrderModal.tsx` | Баталгаажуулах modal |
| Огноо шүүлт | `DateRangeFilter.tsx` | From–To → API `from`/`to` |
| Хуудас | `Pagination.tsx` | page/limit холбосон |

#### Food menu admin

| Файл | Юу хийдэг |
|------|-----------|
| `categoryFilter.tsx` | Категори шүүх / нэмэх / устгах |
| `dishSection.tsx` | Категори бүрийн хоол |
| `dishCard.tsx` | Хоол засах / устгах |
| `AddDishCard.tsx` | Шинэ хоол + Cloudinary зураг upload |

---

## 4. Auth урсгал

### Бүртгэл + шууд нэвтрэлт

```
Signup form
  → POST /user          (user үүсгэнэ, token өгөхгүй)
  → POST /user/login    (token авна)
  → saveAuth(token, user)
  → /
```

### Нэвтрэлт

```
Login form
  → POST /user/login
  → bcrypt шалгана
  → jwt.sign(..., "naba")
  → saveAuth
  → /
```

### Admin хамгаалалт

```
/admin/* нээхэд
  → AdminGuard
  → isAdmin()? тийм → хуудас : үгүй → redirect
```

### Logout

```
UserProfileDropdown
  → clearAuth()
  → localStorage цэвэрлэнэ
```

---

## 5. Захиалгын урсгал

```
1. Нүүр хуудас → GET /food → категориор харуулна
2. Хоол сонгоно → cart-context.addItem()
3. OrderDetailSheet нээнэ
4. Хаяг оруулна (байхгүй бол алдаа)
5. Нэвтрээгүй бол login шаардана
6. placeOrder()
     → POST /order {
         user, totalPrice, foodOrderItems,
         status: "PENDING", address
       }
7. Сагс хоосно, амжилтын modal
8. Admin /admin/orders → GET /order
9. Төлөв солих → PUT /order
10. Устгах → DELETE /order
```

Хүргэлтийн үнэ frontend дээр `+$0.99` нэмэгдэнэ.

---

## 6. JWT болон `"naba"`

### Юу вэ?

| Зүйл | Тайлбар |
|------|---------|
| `"naba"` | Серверийн **тамганы нууц** (secret). Заавал энэ үг байх албагүй. |
| Token | Login амжилттай үед үүсдэг урт string. Browser-т хадгалагдана. |
| Password | Хэрэглэгчийн нууц үг (bcrypt-ээр hash) |

### Яаж ажилладаг вэ?

1. Login амжилттай → `{ userId, email, role }`-ийг `"naba"`-аар тамгална (`jwt.sign`)
2. Token-ийг frontend `localStorage`-д хадгална
3. Secret солих (`"naba"` → өөр зүйл):
   - Шинэ login → ажиллана
   - Хуучин token → хүчингүй → дахин нэвтрэх хэрэгтэй

### Аюулгүй байдал

- `"naba"`-г бусдад бүү өг / frontend дээр бүү ил тавь
- Token хуулбал өөр хүн таны нэрээр хүсэлт илгээж болно
- Production дээр `process.env.JWT_SECRET` ашиглах нь дээр

---

## 7. Environment хувьсагчид

### food-back `.env`

| Хувьсагч | Зориулалт |
|----------|-----------|
| `MONGODB_URL` | MongoDB холболт |
| `JWT_SECRET` | Env-д байж болно; одоогийн код ихэвчлэн `"naba"` hardcoded ашиглана |
| `VERCEL` | Байвал `app.listen` алгасна |

### food-front `.env`

| Хувьсагч | Зориулалт |
|----------|-----------|
| `NEXT_PUBLIC_API_URL` | Backend URL (ж: `http://localhost:8000`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Зураг upload |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary preset |

---

## 8. Файлуудын жагсаалт

### Backend

```
food-back/src/index.js
food-back/src/models/user-model.js
food-back/src/models/food-model.js
food-back/src/models/category.js
food-back/src/models/order-model.js
food-back/src/routes/user.js
food-back/src/routes/food.js
food-back/src/routes/category.js
food-back/src/routes/order.js
food-back/src/resolvers/user/*
food-back/src/resolvers/food/*
food-back/src/resolvers/category/*
food-back/src/resolvers/order/*
```

### Frontend

```
food-front/lib/api.ts
food-front/lib/auth.ts
food-front/app/page.tsx
food-front/app/login/*
food-front/app/signup/*
food-front/app/forgot-password/*
food-front/app/_components/*
food-front/app/admin/_features/AdminGuard.tsx
food-front/app/admin/_features/Sidebar.tsx
food-front/app/admin/orders/*
food-front/app/admin/food-menu/*
```

---

## Товч дүгнэлт

| Хэсэг | Технологи | Гол үүрэг |
|-------|-----------|-----------|
| Backend | Express, Mongoose, bcrypt, JWT | API, DB, нэвтрэлт, захиалга |
| Frontend | Next.js, React, Tailwind | UI, сагс, admin самбар |
| Auth | JWT `"naba"` + localStorage | Session |
| Orders | POST/GET/PUT/DELETE `/order` | Checkout → admin удирдлага |

Энэ баримт төслийн кодыг ойлгоход зориулагдсан. Нэмэлт дэлгэрэнгүй (зөвхөн нэг файл гүнзгий) хэрэгтэй бол тухайн файлын нэрийг хэлээрэй.
