import { cuentas } from "../db/data.js";

export const getAllCuentas = (req, res) => {
  const queryParams = req.query;

  if (Object.keys(queryParams).length === 0) {
    return res.status(200).json({
      count: cuentas.length,
      data: cuentas,
    });
  }

  const { _id, client, gender } = queryParams;
  let cuentasFiltradas = [...cuentas];

  if (_id) {
    cuentasFiltradas = cuentasFiltradas.filter((c) => c._id === _id);
  }
  if (client) {
    cuentasFiltradas = cuentasFiltradas.filter((c) =>
      c.client.toLowerCase().includes(client.toLowerCase())
    );
  }
  if (gender) {
    cuentasFiltradas = cuentasFiltradas.filter((c) => c.gender === gender);
  }

  if (cuentasFiltradas.length === 0) {
    return res.status(404).json({ finded: false });
  }

  if (cuentasFiltradas.length === 1) {
    return res.status(200).json({
      finded: true,
      account: cuentasFiltradas[0],
    });
  }

  return res.status(200).json({
    finded: true,
    data: cuentasFiltradas,
  });
};


export const getCuentaById = (req, res) => {
  const { id } = req.params;
  const cuenta = cuentas.find((c) => c._id === id);

  if (cuenta) {
    return res.status(200).json({
      finded: true,
      account: cuenta,
    });
  }

  return res.status(404).json({
    finded: false,
    account: null,
  });
};

export const getCuentasBalance = (req, res) => {
  const cuentasActivas = cuentas.filter((cuenta) => cuenta.isActive === true);

  if (cuentasActivas.length === 0) {
    return res.status(404).json({
      status: false,
      accountBalance: 0,
    });
  }

  const sumaTotal = cuentasActivas.reduce((total, cuenta) => {
    
    const balanceLimpio = cuenta.balance.replace("$", "").replace(",", "");

    const valorNumerico = parseFloat(balanceLimpio);

    return total + valorNumerico;
  }, 0); // 0 es el valor inicial de total

  res.status(200).json({
    status: true,
    accountBalance: sumaTotal,
  });
};