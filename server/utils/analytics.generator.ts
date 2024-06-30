import { Document, Model } from "mongoose";

interface MonthData {
    month: string;
    count: number;
}

export async function generateLast12MonthsData<T extends Document>(
    model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
    const last12Months: MonthData[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1)

}   