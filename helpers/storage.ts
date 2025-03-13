import AsyncStorage from "@react-native-async-storage/async-storage";

export class Storage {
    private static instance: Storage;
    constructor() {
        if(Storage.instance)
        {
            throw new Error("Error: Instantiation failed: Use Storage.getInstance() instead of new.");
        }
    }

    public static getInstance()
    {
        if (Storage.instance == null)
        {
            Storage.instance = new Storage();
        }
        return this.instance;
    }
    public async set(name: string, value: string) {
        await AsyncStorage.setItem(name, value);
    }
    public async get(name: string) {
        return await AsyncStorage.getItem(name);
    }
    public async exists(name: string) {
        return await AsyncStorage.getItem(name) !== null;
    }
    public async tryGet(name: string): Promise<any> {
        const value = await AsyncStorage.getItem(name);
        return {
            hasValue: value !== null,
            value: value
        } ;
    }

    public async remove(name: string) {
        await AsyncStorage.removeItem(name);
    }
}
