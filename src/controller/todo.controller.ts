import {ITodo, TodoModel} from "../model/todo";
import {BodyProp, Controller, Delete, Get, Post, Put, Route} from "tsoa";

@Route('/todo')
export class TodoController extends Controller {
    @Get()
    public async getAll(): Promise<ITodo[]> {
        try {
            let items: any = await TodoModel.find({});
            items = items.map(item => ({
                id: item._id,
                description: item.description
            }));
            return items;
        } catch(err) {
            this.setStatus(500);
            console.error('Caught error', err);
        }
    }

    @Post()
    public async create(@BodyProp() description: string): Promise<void> {
        const item = new TodoModel({description});
        await item.save();
    }

    @Put('/{id}')
    public async update(id: string, @BodyProp() description: string): Promise<void> {
        await TodoModel.findOneAndUpdate(id, {description});
    }

    @Delete('/{id}')
    public async delete(id: string): Promise<void> {
        await TodoModel.findOneAndDelete(id);
    }
}
