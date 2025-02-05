export interface IUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	varified: boolean;
	varificationToken?: string;
	verificationTokenExpiresBy: number;
	role: "admin" | "user";
}
