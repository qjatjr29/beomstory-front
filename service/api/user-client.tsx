import { Api } from './api';
import { handleLoginError, handleSignupError } from "@/utils/error/errorHandler"


// 회원 관련 API
export class userApi extends Api{

    private readonly userPath = '/user-service';
    private readonly authPath = '/auth';

    signup = (data: { email: string; password: string; nickname: string; profileUrl?: string }) => {
        try {
            const response = this.baseInstance.post(`${this.userPath}/signup`, data);
            return response
        } catch (error) {
            throw handleSignupError(error)
        }
    };
    
    login =  async (data: { email: string; password: string }) => {
        try {
            const response = await this.baseInstance.post(`${this.userPath}/login`, data)
            return response;
        } catch (error) {
            throw handleLoginError(error)
        }
    };

    socialLogin = async (provider: string) => {
        const response = this.baseInstance.get(`${this.userPath}/oauth2/authorize/${provider}`);
        return response;
    };

    logout = async () => {
        await this.authInstance.delete(`${this.userPath}/logout`)
    }

    nicknameCheck = async (nickname: string) =>
        await this.baseInstance.get(`/user-service/duplicate?type=nickname&value=${nickname}`);

    emailCheck = async (email: string) =>
        await this.baseInstance.get(`/user-service/duplicate?type=email&value=${email}`);

    getMyInfo = async () => {
        const response = await this.authInstance.get(`${this.userPath}/me`);
        return response.data;
    }

    getUserById = async (userId: number) => {
        const response = await this.baseInstance.get(`${this.userPath}/${userId}`)
        return response
    }

    updateProfile = async (data: { nickname?: string; bio?: string; profileImage?: string }) => {
        const response = await this.authInstance.put(`${this.userPath}/profile`, data)
        return response
    }

    // updateNickname = async (userId: number,data: {nickname: string}) => {
    //     await this.authInstance.patch(`${this.userPath}/${userId}/nickname`, data)
    // }
    // updatePassword = async (userId: number, data: {newPassword: string }) => {
    //     await this.authInstance.patch(`${this.userPath}/${userId}/password`, data)
    // }

    updateNickname = async (userId: number, data: { nickname: string }) => {
        const id = Number(userId);
        await this.authInstance.patch(`${this.userPath}/${id}/nickname`, data)
    }
    
    updatePassword = async (userId: number, data: { currentPassword: string, newPassword: string }) => {
        const id = Number(userId);
        await this.authInstance.patch(`${this.userPath}/${id}/password`, data)
    }

    // checkPassword = async (password: string) => {
    //     const response = await this.authInstance.post(`${this.userPath}/check-password`, { password })
    //     return response.data
    //   }

    // OAuth 콜백 처리
    handleOAuthCallback = async (provider: string, code: string) => {
        const response = await this.baseInstance.get(`${this.userPath}/login/oauth2/code/${provider}`, {
            params: { code },
        })
        return response.data
    }
};

export default new userApi();

