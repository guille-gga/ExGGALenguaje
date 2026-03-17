import { db } from "./db/init"
import express from "express"
import cors from "cors"
import type { Request, Response } from "express"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))

app.get("/api/mensajes", (req: Request, res: Response) => {
  const mensajes = db.query("SELECT * FROM mensajes").all()
  res.json(mensajes)
})

app.post("/api/mensajes", (req: Request, res: Response) => {
  const { user, mensaje, access_password } = req.body
  

  
  if (access_password != 'xaphym') {
    return res.json({ "status": "error: no enviaste la contraseña del servidor" })
  }
  if (!user) {
    return res.json({ "status": "error: no enviaste user" })
  }
  if (!mensaje) {
    return res.json({ "status": "error: no enviaste mensaje" })
  }
  const resultado = db.query("INSERT INTO mensajes (user, content) VALUES (?, ?)").run(user, mensaje)
  const nuevo_mensaje = db.query("SELECT * FROM mensajes WHERE id = ?").get(resultado.lastInsertRowid)
  res.json({ "status": "ok", nuevo_mensaje })
})

const PORT = 8000;
app.listen(PORT, () => console.log(`Servidor funcionando en :${PORT}`))
