import { Engine, MeshBuilder, Scene } from "babylonjs";             //Import classes from babylonjs
import { AdvancedDynamicTexture, TextBlock} from 'babylonjs-gui';   //Import classes from babylonjs-gui

/**
 * 
 */
export class App {
    private engine: Engine;                     //Engine
    private canvas: HTMLCanvasElement;          //HTMLCanvas

    constructor(engine: Engine, canvas:HTMLCanvasElement)
    {
        this.engine = engine;
        this.canvas = canvas;
        console.log("app is running");
    }


    /**
     * 
     * @param canvasID is the string ID of the HTMLCanvasElement target for rendering the scene
     * @param authoringData is a dictionary of dictionarys that contains various information
     * from other XRAuthor components 
     */
    async createXRScene(
        canvasID: string,
        authoringData: {[dataType: string]:{[key:string]:any}} = {}
    )
    {
        const scene = new Scene(this.engine);
        scene.createDefaultCameraOrLight();
        
        const sphere = MeshBuilder.CreateSphere('sphere', {diameter: 1.3}, scene);
        sphere.position.y = 1;
        sphere.position.z = 5;

        const helloPlane = MeshBuilder.CreatePlane('hello plane', { size:15});
        helloPlane.position.y = 0;
        helloPlane.position.z = 5;
        const helloTexture = AdvancedDynamicTexture.CreateForMesh(helloPlane);

        const helloText = new TextBlock('hello');
        helloText.text = 'Hello XR';
        helloText.color = 'purple';
        helloText.fontSize = 50;
        helloTexture.addControl(helloText);

        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: {
                sessionMode: 'immersive-vr'
            }
        });

        // xr.baseExperience.featuresManager

        //only for debugging
        //(window as any).xr = xr;

        return scene;
    }
}