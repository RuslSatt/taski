import type { User as IUser } from '@supabase/supabase-js';

export interface User extends IUser {
}

export interface UserSchema {
	user?: User;
}
