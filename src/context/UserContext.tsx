import React, { createContext, useContext, useState, ReactNode } from "react";

// Types for user, investment, referral, bonus, salary
export interface Investment {
  amount: number;
  slab: string;
  status: "Active" | "Completed" | "Pending";
  progress: number;
  dailyReturn: number;
}

export interface Referral {
  id: string;
  name: string;
  joined: string;
  active: boolean;
}

export interface Bonus {
  type: string;
  amount: number;
  date: string;
  description?: string;
}

export interface Salary {
  rank: string;
  amount: number;
  nextPayment: string;
  totalEarned: number;
}

export interface UserData {
  investments: Investment[];
  referrals: Referral[];
  bonuses: Bonus[];
  salary: Salary;
  // Add more as needed
}

interface UserContextType {
  user: UserData;
  addInvestment: (investment: Investment) => void;
  addReferral: (referral: Referral) => void;
  addBonus: (bonus: Bonus) => void;
  updateSalary: (salary: Salary) => void;
}

const defaultUser: UserData = {
  investments: [],
  referrals: [],
  bonuses: [],
  salary: {
    rank: "Starter",
    amount: 25,
    nextPayment: "10 days",
    totalEarned: 0,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData>(defaultUser);

  const addInvestment = (investment: Investment) => {
    setUser((prev) => ({
      ...prev,
      investments: [investment, ...prev.investments],
      // Example: Add bonus for first investment
      bonuses:
        prev.investments.length === 0
          ? [
              ...prev.bonuses,
              { type: "First Investment", amount: 50, date: new Date().toISOString() },
            ]
          : prev.bonuses,
    }));
  };

  const addReferral = (referral: Referral) => {
    setUser((prev) => ({
      ...prev,
      referrals: [referral, ...prev.referrals],
    }));
  };

  const addBonus = (bonus: Bonus) => {
    setUser((prev) => ({ ...prev, bonuses: [bonus, ...prev.bonuses] }));
  };

  const updateSalary = (salary: Salary) => {
    setUser((prev) => ({ ...prev, salary }));
  };

  return (
    <UserContext.Provider value={{ user, addInvestment, addReferral, addBonus, updateSalary }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
