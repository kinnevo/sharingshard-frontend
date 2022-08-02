

import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'userGlobal',
    state: () => ({
      currentUser: "undef",
      currentExperience: 0,
      counter: 20,
    }),
    actions: {
      setCurrentUser(  user ){
        this.currentUser = user;
        // alert( "setCurrentUser" + user + "after setCurrentUser" + this.currentUser);
      },

      getCurrentUser(){
        // alert( "getCurrentUser" + this.currentUser)
        return this.currentUser;
      },

      setCurrentExperience( experienceN ){
        // alert( "setCurrentExperience 1: " + this.currentUser)
        this.currentExperience = experienceN;
        // alert( "setCurrentExperience 2: " + this.currentUser)

      },

      getCurrentExperience(){
        // alert( "getCurrentExperience" + this.currentExperience)
        return this.currentExperience;

      },


      increment_counter() 
      {
        // alert("defineStore");
        this.counter += 1;
        // alert( this.counter );
      },

      set_counter(){
        this.counter = 100;
      }
    },
  });