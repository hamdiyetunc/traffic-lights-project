class User {
    email: string
    name: string

    constructor(email: string, name: string){
        this.email = email;
        this.name = name;
    }
}

const muhittin = new User("m@gmail.com", "Muhittin");

// Classes are created this way.
// Strings in the constructor can be deleted.