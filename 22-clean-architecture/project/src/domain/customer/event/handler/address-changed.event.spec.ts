import EventDispatcher from "../../../@shared/event/event-dispatcher";
import AddressChangedEvent from "../address-changed.event";
import EnviaConsoleLogHandler from "./envia-console-log.handler";

describe("change address event notification", () => {

    it("should notify all events when change address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1);

        const changeAddressEvent = new AddressChangedEvent({
            id: "1",
            name: "Customer Name",
            address: "Customer Address"
        });
        
        eventDispatcher.notify(changeAddressEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});