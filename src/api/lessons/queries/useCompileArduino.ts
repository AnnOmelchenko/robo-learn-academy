export const useCompileArduino = async (value: string) => {
    const result = await fetch('https://hexi.wokwi.com/build', {
      method: 'post',
      body: JSON.stringify({ sketch: value }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return result;
}