/// <reference path="../../../../typescriptdefinitions/types-gtanetwork/index.d.ts" />
var IntersectOptions;
(function (IntersectOptions) {
    IntersectOptions[IntersectOptions["Everything"] = -1] = "Everything";
    IntersectOptions[IntersectOptions["Map"] = 1] = "Map";
    IntersectOptions[IntersectOptions["Mission_Entities"] = 2] = "Mission_Entities";
    IntersectOptions[IntersectOptions["Peds1"] = 12] = "Peds1";
    IntersectOptions[IntersectOptions["Objects"] = 16] = "Objects";
    IntersectOptions[IntersectOptions["Unk1"] = 32] = "Unk1";
    IntersectOptions[IntersectOptions["Unk2"] = 64] = "Unk2";
    IntersectOptions[IntersectOptions["Unk3"] = 128] = "Unk3";
    IntersectOptions[IntersectOptions["Vegetation"] = 256] = "Vegetation";
    IntersectOptions[IntersectOptions["Unk4"] = 512] = "Unk4";
})(IntersectOptions || (IntersectOptions = {}));
var lastEntity = null;
function lerp(start, end, fraction) {
    return new Vector3((start.X + (end.X - start.X) * fraction), (start.Y + (end.Y - start.Y) * fraction), (start.Z + (end.Z - start.Z) * fraction));
}
function getAimPoint() {
    var resolution = API.getScreenResolutionMantainRatio();
    var cursorPosition = API.getCursorPositionMantainRatio();
    cursorPosition.X = resolution.Width / 2;
    cursorPosition.Y = resolution.Height / 2;
    return API.screenToWorldMantainRatio(cursorPosition);
}
API.onKeyDown.connect(function (sender, keyEventArgs) {
    if (keyEventArgs.KeyCode != Keys.F4 || lastEntity == null)
        return;
    var position = getAimPoint();
    var rotation = API.getGameplayCamRot();
    rotation.X = 0;
    API.sendChatMessage("Sending create object: " + lastEntity);
    API.triggerServerEvent("CREATE_OBJECT", lastEntity, position, rotation);
});
API.onKeyDown.connect(function (sender, keyEventArgs) {
    if (keyEventArgs.KeyCode != Keys.F3)
        return;
    var startPoint = API.getGameplayCamPos();
    var aimPoint = getAimPoint();
    startPoint.Add(aimPoint);
    var endPoint = lerp(startPoint, aimPoint, 1.1);
    var rayCast = API.createRaycast(startPoint, endPoint, IntersectOptions.Everything, null);
    if (!rayCast.didHitEntity) {
        API.sendChatMessage("Nothing hit.");
        return;
    }
    var hitEntityHandle = rayCast.hitEntity;
    lastEntity = API.getEntityModel(hitEntityHandle);
    API.sendChatMessage("Entity hit: " + lastEntity);
    var minDimension = new Vector3();
    var maxDimension = new Vector3();
    var modelHash = lastEntity;
});
//# sourceMappingURL=main.js.map