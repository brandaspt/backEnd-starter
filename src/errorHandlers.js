export const errorHandler = (err, req, res, next) => {
  if (err.status === 500) {
    console.log(err)
    res.status(err.status).json({ ok: false, message: "Something went wrong" })
  } else res.status(err.status).json({ ...err, ok: false })
}
