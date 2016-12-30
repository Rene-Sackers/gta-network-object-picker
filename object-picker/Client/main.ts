/// <reference path="../../../../typescriptdefinitions/types-gtanetwork/index.d.ts" />

enum IntersectOptions {
    Everything = -1,
    Map = 1,
    Mission_Entities = 2,
    Peds1 = 12,//4 and 8 both seem to be peds
    Objects = 16,
    Unk1 = 32,
    Unk2 = 64,
    Unk3 = 128,
    Vegetation = 256,
    Unk4 = 512
}

var lastEntity: number = null;

function lerp(start: Vector3, end: Vector3, fraction: number) {
    return new Vector3(
        (start.X + (end.X - start.X) * fraction),
        (start.Y + (end.Y - start.Y) * fraction),
        (start.Z + (end.Z - start.Z) * fraction)
    );


}

function getAimPoint() {
    var resolution = API.getScreenResolutionMantainRatio();
    var cursorPosition = API.getCursorPositionMantainRatio();
    cursorPosition.X = resolution.Width / 2;
    cursorPosition.Y = resolution.Height / 2;
    
    return API.screenToWorldMantainRatio(cursorPosition);
}

API.onKeyDown.connect((sender, keyEventArgs) => {
    if (keyEventArgs.KeyCode != Keys.F4 || lastEntity == null) return;

    var position = getAimPoint();
    var rotation = API.getGameplayCamRot();
    rotation.X = 0;

    API.sendChatMessage("Sending create object: " + lastEntity);
    API.triggerServerEvent("CREATE_OBJECT", lastEntity, position, rotation);
});

API.onKeyDown.connect((sender, keyEventArgs) => {
    if (keyEventArgs.KeyCode != Keys.F3) return;

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