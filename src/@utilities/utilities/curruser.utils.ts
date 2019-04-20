import {SessionUtils} from './session.utils';

export abstract class CurruserUtils {
    static setCurrentUser(value: any): void {
        SessionUtils.setSession('currentUser', value);
    }

    static getCurrentUser(): any {
        return SessionUtils.getSession('currentUser');
    }

    static getToken(): any {
        const {user_name, DashUser} = this.getCurrentUser();
        return {username: user_name, token: DashUser.token};
    }
}
