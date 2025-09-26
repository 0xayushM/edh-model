// utils/rigHelpers.ts
import * as THREE from "three";

// helpers
export const deg = (v: number) => (v * Math.PI) / 180;
export const lerpVec3 = (a: THREE.Vector3, b: THREE.Vector3, t: number, out = new THREE.Vector3()) =>
  out.set(
    THREE.MathUtils.lerp(a.x, b.x, t),
    THREE.MathUtils.lerp(a.y, b.y, t),
    THREE.MathUtils.lerp(a.z, b.z, t),
  );
export const slerpQuat = (a: THREE.Quaternion, b: THREE.Quaternion, t: number, out = new THREE.Quaternion()) =>
  out.copy(a).slerp(b, t);

export const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Finite-page helper (same as before)
export const S = (n: number) => n / 11;
export const cuts = [0.0, S(1), S(2), S(3), S(4), S(5), S(6), S(7), S(8), S(9), S(10), 1.0];

// constants used by SceneRig
export const FINAL_Y = 2;
export const ROLL_DEG_SIGN = -90;

// shell names
export const shellNames = [
  "cap_bl", "cap_br", "cap_tl", "cap_tr",
  "shell_bl_1","shell_br_1","shell_tl_1","shell_tr_1",
  "shell_bl_3","shell_br_3","shell_tl_3","shell_tr_3",
];

// global fade targets (same as before)
export const fadeTargetNames = [
  "cap_1","gear_1","gear_3_shaft","gear_3_disc_1","gear_3_disc_2","gear_3_disc_3","gear_3_disc_4",
  "gear_5","gear_6","gear_6_1","gear_6_2","gear_6_3","gear_7","gear_8","shell_2","shell_gear","gear_10","gear_12"
];

// positions & rotation placeholders (mirror your original arrays)
// Keep these exported so SceneRig can pick them by index.
export const FINAL_POS_Y = FINAL_Y;
export const P0 = new THREE.Vector3(0, 0, 0);
export const P1 = new THREE.Vector3(0, 0, 0);
export const P2 = new THREE.Vector3(0, 0, 0);
export const P3 = new THREE.Vector3(-0.5, -0.75, 1.7);
export const P4 = new THREE.Vector3(0.4, -0.4, 1.5);
export const P5 = new THREE.Vector3(-0.7, 0.2, 1.7);
export const P6 = new THREE.Vector3(0.2, -0.7, 1.7);
export const P7 = new THREE.Vector3(0, 0, 0.5);
export const PFinal = new THREE.Vector3(0, FINAL_Y, 0);

export const posAList = [P0, P1, P2, P2, P3, P4, P5, P6, P2, P2, P2];
export const posBList = [P1, P2, P2, P3, P4, P5, P6, P2, P2, P2, PFinal];

// Rotations
export const Q_left = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(0), deg(90), deg(-120), "YXZ"));

export const Q_360 = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-10), deg(-90), deg(-120), "YXZ"));

export const Q_rightRoll45 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-500, deg(90), deg(-120), "YXZ"));
export const Q_leftRolled = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-90), deg(90), deg(ROLL_DEG_SIGN), "YXZ"));

export const Q_leftRoll45 = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-10), deg(120), deg(-120), "YXZ"));

export const Q_initial = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(180), 0, 0, "YXZ"));
export const Q_section1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(90), deg(0), deg(0), "YXZ"));
export const Q_section2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(130), deg(40), deg(45), "YXZ"));
export const Q_section3 = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(50), deg(120), deg(-120), "YXZ"));
export const Q_section4 = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(-60), deg(20), deg(45), "YXZ"));
export const Q_rotate = new THREE.Quaternion().setFromEuler(new THREE.Euler(deg(0), deg(90), deg(30), "YXZ"));

export const rotAList = [Q_left, Q_leftRoll45, Q_leftRoll45,  Q_rightRoll45, Q_section1, Q_section2, Q_section3, Q_section4, Q_rotate, Q_rotate, Q_leftRoll45];
export const rotBList = [Q_leftRoll45, Q_leftRoll45, Q_rightRoll45, Q_section1, Q_section2, Q_section3, Q_section4, Q_rotate, Q_rotate, Q_leftRoll45, Q_leftRolled];
