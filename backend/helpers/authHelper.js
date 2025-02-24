// import bcrypt, { compare } from 'bcrypt'
// import express from 'express'
// import passport from 'passport';


// export const hashPassword = async (password) => {
//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         return hashedPassword;
//     } catch (err) {
//         console.error("Error hashing password:", err);
//     }
// };


// export const comparePassword = async (password, hashedPassword) => {
//     return bcrypt.compare(password, hashedPassword);
// };


import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
