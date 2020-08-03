import { ModelField } from "../../core/crud/modelField";
import { MyBaseEntity } from "share/entities/myBaseEntity";
import { ModelDisplayOption } from "core/crud/modelDisplay";

export interface ComponentInListProps {
    field: ModelField<MyBaseEntity>
    item: MyBaseEntity
    display: ModelDisplayOption<MyBaseEntity>
}