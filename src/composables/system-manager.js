import axios from 'axios';
import { ref } from 'vue';
import { useAuth } from 'vue-auth3';
import { apiUri } from '@/constants/apiUri';
const data = ref(null);
const categories = ref([]);
const dataCategories = ref(null);
export function useSystemManager() {
    const auth = useAuth();
    const error = ref(null);
    const loadingPromise = ref();
    const isLoading = ref(false);
    const fetchingSelected = async () => {
        if (auth.check()) {
            const token = auth.token();
            const response = await axios.get(`${apiUri}/categories/type`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response;
            dataCategories.value = data;
        }
    };
    const doFetch = async (url, token) => {
        isLoading.value = true;
        const response = await auth
            .fetch({
            method: 'get',
            url: url,
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.data)
            .then((json) => {
            // console.log('🚀 ~ useSystemManager ~ data:', json)
            data.value = json.data;
            return json.data;
        })
            .catch((err) => (error.value = err))
            .finally(() => (isLoading.value = false));
    };
    const fetchCategoryDocument = async () => {
        const response = await axios.get(`${apiUri}/categories/list?type=document`, {
            headers: {
                Authorization: `Bearer ${auth.token()}`,
            },
        });
        const { data } = response.data;
        data.items.map((item) => {
            item.map((subItem) => {
                categories.value.push({
                    id: subItem.id,
                    name: subItem.name,
                });
            });
        });
    };
    return {
        fetchingSelected,
        dataCategories,
        data,
        error,
        loadingPromise,
        isLoading,
        doFetch,
        fetchCategoryDocument,
        categories,
    };
}
//# sourceMappingURL=system-manager.js.map