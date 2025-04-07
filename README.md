# 🚗 DriveOn - Mock Backend API

Este es un servidor **mock** creado con Node.js + Express para simular el comportamiento de la app **DriveOn (Pasajeros)**. La data es estática y se mantiene en memoria, ideal para pruebas en desarrollo o con apps Flutter.

---

## 🔗 API Base

```
http://localhost:4000
```

---

## 🔐 1. Autenticación

### `POST /auth/login`
**Descripción:** Iniciar sesión del usuario.  
**Body (JSON):**
```json
{
  "email": "user@driveon.com",
  "password": "password123"
}
```

---

## 👤 2. Perfil

### `GET /profile/:userId`
**Descripción:** Obtener la información del perfil del usuario.  
**Ejemplo:**
```
GET /profile/1
```

---

## 👨‍👩‍👧‍👦 3. Contactos de Seguridad

### `GET /security-contacts/:userId`
**Descripción:** Obtener contactos de seguridad del usuario.  
**Ejemplo:**
```
GET /security-contacts/1
```

### `POST /security-contacts/:userId`
**Descripción:** Crear o actualizar los contactos de seguridad.  
**Body (JSON):**
```json
{
  "contacts": [
    { "name": "Papá", "phone": "+584121234567" },
    { "name": "Hermana", "phone": "+584161111111" }
  ]
}
```
**Ejemplo:**
```
POST /security-contacts/1
```

---

## 💰 4. Presupuesto Corporativo

### `GET /budget/:userId`
**Descripción:** Obtener el presupuesto del departamento asignado al usuario.  
**Ejemplo:**
```
GET /budget/2
```

---

## 📚 Resumen de Endpoints

| Método | Ruta                          | Descripción                          |
|--------|-------------------------------|--------------------------------------|
| POST   | `/auth/login`                 | Iniciar sesión                       |
| GET    | `/profile/:userId`           | Obtener perfil                       |
| GET    | `/security-contacts/:userId` | Obtener contactos de seguridad       |
| POST   | `/security-contacts/:userId` | Crear/editar contactos de seguridad  |
| GET    | `/budget/:userId`            | Obtener presupuesto del departamento |

---

## ▶️ Cómo Ejecutar

```bash
npm install express cors
node driveon-mock-server.js
```

El servidor estará disponible en `http://localhost:4000`.

---

## 🧪 Recomendaciones

Puedes probar los endpoints utilizando herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/).

---

## 📝 Licencia

MIT License © 2025
