import { useEffect, useRef } from 'react';

const SimpleSnowEffect = () => {
  const canvasRef = useRef(null);
  let gl, program, vertices, time, resolution;
  const ELEMENTS = 2;

  const createProgram = (gl) => {
    const fragment = loadShader(gl, gl.FRAGMENT_SHADER);
    const vertex = loadShader(gl, gl.VERTEX_SHADER);
    const program = gl.createProgram();

    gl.attachShader(program, fragment);
    gl.attachShader(program, vertex);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log(`Unable to initialize shader program: ${gl.getProgramInfoLog(program)}`);
    }

    return program;
  };

  const loadShader = (gl, type) => {
    const source = type === gl.VERTEX_SHADER ? `
      precision mediump float;
      attribute vec2 position;
      void main(void) {
        gl_Position = vec4(position, 1.0, 1.0);
      }
    ` : `
      precision highp float;
      #extension GL_OES_standard_derivatives : enable
      uniform vec2 resolution;
      uniform float time;

      float snow(vec2 uv, float scale) {
        float w = smoothstep(1.0, 0.0, -uv.y * (scale / 10.0));
        if (w < 0.1) return 0.0;
        float c = time / scale;
        uv.y += c;
        uv.x -= c;
        uv.y += c * 1.2;  // Slightly slower vertical movement
        uv.x += cos(uv.y + time * 0.3) / scale;  // Reduced horizontal movement
        uv *= scale;
        vec2 s = floor(uv);
        vec2 f = fract(uv);
        vec2 p = vec2(0.0);
        float k = 3.0;
        float d = 0.0;
        p = 0.5 + 0.35 * sin(11.0 * fract(sin((s + p + scale) * mat2(7, 3, 6, 5)) * 5.0)) - f;
        d = length(p);
        k = min(d, k);
        k = smoothstep(0.0, k, sin(f.x + f.y) * 0.01);
        return k * w;
      }

      void main(void) {
        float size = mix(min(resolution.x, resolution.y), max(resolution.x, resolution.y), 0.5);
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / size;
        float c = smoothstep(1.0, 0.0, clamp(uv.y * 0.1 + 0.75, 0.0, 0.75));
        
        // Reduced number of layers with more distinct particles
        c += snow(uv, 50.0) * 0.15;  // Far particles
        c += snow(uv, 30.0) * 0.25;  // Mid particles
        c += snow(uv, 15.0) * 0.4;   // Near particles
        
        gl_FragColor = vec4(vec3(1.0), c * 0.15);  // More transparent with distinct particles
      }
    `;

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const createScene = (gl, program) => {
    const BUFFER = gl.createBuffer();
    const COORDS = new Float32Array([
      -1.0,  1.0,
       1.0,  1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0, -1.0,
      -1.0, -1.0
    ]);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.bindBuffer(gl.ARRAY_BUFFER, BUFFER); 
    gl.bufferData(gl.ARRAY_BUFFER, COORDS, gl.STATIC_DRAW);

    vertices = COORDS.length / ELEMENTS;
    time = gl.getUniformLocation(program, 'time');
    resolution = gl.getUniformLocation(program, 'resolution');
    program.position = gl.getAttribLocation(program, 'position');

    gl.enableVertexAttribArray(program.position);
    gl.vertexAttribPointer(program.position, ELEMENTS, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    handleResize(gl);
  };

  const render = (now) => {
    if (!gl || !program) return;
    gl.uniform1f(time, now * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, vertices);
    requestAnimationFrame(render);
  };

  const handleResize = (gl) => {
    if (!gl || !program) return;
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform2fv(resolution, [gl.canvas.width, gl.canvas.height]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    gl = canvas.getContext('webgl');
    if (!gl) return;

    program = createProgram(gl);
    createScene(gl, program);
    requestAnimationFrame(render);

    const resizeHandler = () => handleResize(gl);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        mixBlendMode: 'soft-light',
        opacity: 0.3
      }}
    />
  );
};

export default SimpleSnowEffect;
