class BoxFactory {

    constructor(scene) {
        this.scene = scene;
    }

    generateRect(x, y, z, color, px, py, pz) {
        var box = new THREE.Mesh(
            //Set up using default geometry
            new THREE.BoxGeometry(x, y, z),
            new THREE.MeshLambertMaterial({
                color: color
            })
        );
        box.position.set(px, py, pz);
        this.scene.add(box);
        return box;
    }

    generateSpecularSurface(color, specular, x, y, z, px, py, pz) {
        var box = new THREE.Mesh(
            //Set up using default geometry
            new THREE.BoxGeometry(x, y, z),
            //Create a phong surface. Based off the phong reflection model Ambient+Specular+Diffuse
            new THREE.MeshPhongMaterial({
                color: color,
                ambient: color,
                specular: specular,
                shininess: 100,
                shading: THREE.FLatShading,
                side: THREE.DoubleSide
            })
        )

        box.position.set(px, py, pz);
        this.scene.add(box);
        return box;
    }

}