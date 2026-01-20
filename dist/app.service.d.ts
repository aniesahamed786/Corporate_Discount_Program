import { DataSource } from 'typeorm';
export declare class AppService {
    private readonly datasource;
    constructor(datasource: DataSource);
    getHello(): string;
    getAdmin(): Promise<any>;
}
