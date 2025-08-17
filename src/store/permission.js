import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
export const usePermissionStore = defineStore('permission', () => {
    const permision = ref(null);
    const permissionList = ref([]);
    const userData = ref(null);
    const permissionListData = ref([]);
    async function fetchPermission(token) {
        if (permision.value)
            return;
        try {
            const response = await axios.get(`${apiUri}/user/permission`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const dataPermit = response.data.data;
            permision.value = dataPermit;
            console.log('🚀 ~ fetchPermission ~ permision.value:', permision.value);
            permissionList.value = Object.keys(dataPermit);
            console.log('🚀 ~ fetchPermission ~ permissionList.value:', permissionList.value);
        }
        catch (error) {
            console.error('Error fetching permision:', error);
        }
    }
    const fetchPermissionList = async (token) => {
        try {
            const response = await axios.get(`${apiUri}/permission/list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response.data;
            console.log('🚀 ~ fetchPermissionList ~ data:', data);
            permissionListData.value = data;
        }
        catch (error) {
            console.error('Error fetching permision:', error);
        }
    };
    function checkPermission(permission, actions) {
        if (!permision.value)
            return false;
        const rolePermission = permision.value[permission];
        if (!rolePermission)
            return false;
        if (rolePermission.length === 0)
            return false;
        if (rolePermission.includes(actions))
            return true;
    }
    const fetchUserData = async (token) => {
        const auth = useAuth();
        if (!auth.check())
            return;
        if (permision.value)
            return;
        console.log('call trong store');
        try {
            const response = await auth.fetch({
                method: 'get',
                url: `${apiUri}/user/info`,
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response.data;
            userData.value = data;
        }
        catch (error) {
            if (error.response?.status === 401) {
                // Logout user
                await auth
                    .logout({
                    makeRequest: false,
                    redirect: '/login',
                })
                    .then(() => {
                    userData.value = null;
                });
                // console.clear()
            }
        }
    };
    const setUserPermission = (permission) => {
        if (!userData.value)
            return;
        if (userData.value) {
            userData.value.per_group_name = permission;
        }
    };
    const getPermission = computed(() => {
        return permision;
    });
    const getPermissionList = computed(() => {
        return permissionList;
    });
    const getUserPermission = computed(() => {
        return userData;
    });
    function $reset() {
        permision.value = null;
        permissionList.value = [];
        userData.value = null;
    }
    return {
        permision,
        permissionListData,
        fetchPermission,
        fetchPermissionList,
        getPermission,
        getPermissionList,
        getUserPermission,
        checkPermission,
        setUserPermission,
        $reset,
        fetchUserData,
        permissionList,
        userData,
    };
});
//# sourceMappingURL=permission.js.map