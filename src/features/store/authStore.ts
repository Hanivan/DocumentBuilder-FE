import { create } from "zustand";

import axios from "axios";
import { randomBytes } from "crypto";

interface AuthStore {
  email: string | null;
  hashId: string | null;
  token?: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    new_password: string,
    hash_id: string
  ) => Promise<void>;
}

/**
 * permisi kak. ada yang tau tidak bagaimana menyimpan email dan hashidnya keluar? saya menggunakan zustand
 */

export const AuthStore = create<AuthStore>((set, get) => ({
  email: "",
  hashId: "",
  token: null,
  register: async (email, password) => {
    try {
      const response = {
        status: 200,
        data: {
          token: randomBytes(Math.ceil(32 / 2))
            .toString("hex")
            .slice(0, 32),
        },
      };
      // await axios.post(
      //   `${process.env.DEV_LOCAL}/api/v1/login-or-register`,
      //   {
      //     email,
      //     open_id: "email",
      //     password,
      //   }
      // );
      if (response.status === 200) {
        set({ token: response.data.token, email, hashId: response.data.token });
        sessionStorage.setItem("token", response.data.token);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  login: async (email, password) => {
    console.log(
      {
        email: get().email,
        hashId: get().hashId,
      },
      "==== before"
    );
    try {
      const response = {
        status: 200,
        data: {
          token: randomBytes(Math.ceil(32 / 2))
            .toString("hex")
            .slice(0, 32),
        },
      };
      if (response.status === 200) {
        set({ token: response.data.token, email, hashId: response.data.token });
        sessionStorage.setItem("token", response.data.token);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(
        `${process.env.DEV_LOCAL}/api/v1/forgot-password`,
        {
          email,
        }
      );
      if (response?.status === 200) {
        const res = await response?.data?.data;
        return res;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  },
  resetPassword: async (email, new_password, hash_id) => {
    try {
      const response = await axios.post(
        `${process.env.DEV_LOCAL}/api/v1/reset-password`,
        {
          email,
          new_password,
          hash_id,
        }
      );
      if (response?.status === 200) {
        const res = await response?.data;
        return res;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  },
}));
