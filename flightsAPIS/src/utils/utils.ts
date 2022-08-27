import { Status } from "../types/interfaces"

export function getStatus(status: string): Status{
    if(status === "scheduled"){
        return Status.scheduled;
    }
    if(status === "en-route"){
        return Status.enRoute;
    }
    if(status === "landed"){
        return Status.landed;
    }
    if(status === "cancelled"){
        return Status.cancelled;
    }
    if(status === "active"){
        return Status.active;
    }
    throw Error("Status flight are not valid.");
}
