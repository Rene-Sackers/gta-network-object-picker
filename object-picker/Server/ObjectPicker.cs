using System;
using GTANetworkServer;
using GTANetworkShared;
using System.Linq;

namespace GTANetworkTest.src.fuel
{
    public class ObjectPicker : Script
    {
        private const string FuelLevelDataKey = "Fuel-FuelLevel";

        public ObjectPicker()
        {
            API.onClientEventTrigger += onClientEventTrigger;
        }

        public void onClientEventTrigger(Client sender, string name, object[] args)
        {
            if (name != "CREATE_OBJECT") return;

            var model = (int)args[0];
            var position = (Vector3)args[1];
            var rotation = (Vector3)args[2];

            sender.sendChatMessage("Creating model: " + model);
            
            var veh = API.createObject(model, position, rotation);
        }
    }
}
