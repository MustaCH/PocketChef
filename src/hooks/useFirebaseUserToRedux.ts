'use client'

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/slices/userSlice";
import { auth } from "@/firebase/config";

export function useFirebaseUserToRedux() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerData[0]?.providerId || null,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);
}
