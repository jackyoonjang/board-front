import { User } from "types/interface";
import { create } from "zustand";

interface LoginUserStore{
    loginUser : User | null;
    setLoginUser : (loginUser : User) => void;
    resetloginUser: () => void;
};

const useLoginUserStore = create<LoginUserStore>(set => ({
    loginUser: null,
    setLoginUser: loginUser => set(state => ({...state, loginUser})),
    resetloginUser: () => set(state => ({...state, loginUser: null}))
}));

export default useLoginUserStore;