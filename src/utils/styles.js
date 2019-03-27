const REG_LEN = /([+-]?[0-9#]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/

/**
 * 抽取长度信息  例如 10vw -> {len:10, unit: 'vw'}
 * @param len
 * @returns {{len: (*|string), unit: (*|string)}}
 */
function getLenSplits (len) {
  const splits = REG_LEN.exec(len)
  return {
    len: parseFloat(splits[1]),
    unit: splits[2]
  }
}

function getLength (unitLen, device) {
  // -15vw ->  [-15vw,-15,vw]
  if (unitLen === 0 || unitLen == null || unitLen === '') {
    return 0
  }
  const { len, unit } = getLenSplits(unitLen)
  let number = 0
  if (unit === 'vw') {
    number = Math.floor(device.width * len / 100)
  } else if (unit === 'vh') {
    number = Math.floor(device.height * len / 100)
  } else if (unit === 'px') {
    number = len
  }
  return number
}

function getElementStyle (element, device, animation) {
  const styles = []
  // position and size
  if (element.position && device) {
    if (element.position.vertical === 'top') {
      styles.push(`top: ${getLength(element.position.offsetY, device)}px`)
    } else if (element.position.vertical === 'center') {
      styles.push(`top: ${device.height / 2 - getLength(element.position.height, device) / 2 + getLength(element.position.offsetY, device)}px`)
    } else if (element.position.vertical === 'bottom') {
      styles.push(`bottom: ${getLength(element.position.offsetY, device)}px`)
    }

    if (element.position.horizontal === 'left') {
      styles.push(`left: ${getLength(element.position.offsetX, device)}px`)
    } else if (element.position.horizontal === 'center') {
      styles.push(`left: ${(device.width / 2) - (getLength(element.position.width, device) / 2) + getLength(element.position.offsetX, device)}px`)
    } else if (element.position.horizontal === 'right') {
      styles.push(`right: ${getLength(element.position.offsetX, device)}px`)
    }
    if (element.type === 'image') {
      styles.push(`width: ${getLength(element.position.width, device)}px`)
      styles.push(`height: ${getLength(element.position.height, device)}px`)
    }
    if (element.type === 'text') {
      styles.push(`width: ${getLength(element.position.width, device)}px`)
    }
  }

  if (element.background) {
    styles.push(getBackgroundStyle(element.background, element.position))
  }

  if (element.clip) {
    if (element.clip.type === 'polygon') {
      styles.push(`clip-path: polygon(${element.clip.points[0]}% ${element.clip.points[1]}%, ${element.clip.points[2]}% ${element.clip.points[3]}%, ${element.clip.points[4]}% ${element.clip.points[5]}%, ${element.clip.points[6]}% ${element.clip.points[7]}%)`)
    } else if (element.clip.type === 'circle') {
      styles.push(`clip-path: circle(${element.clip.points[0]}% at ${element.clip.points[1]}% ${element.clip.points[2]}%)`)
    } else if (element.clip.type === 'ellipse') {
      styles.push(`clip-path: ellipse(${element.clip.points[0]}% ${element.clip.points[1]}% at ${element.clip.points[2]}% ${element.clip.points[3]}%)`)
    }
  }
  // border
  if (element.border) {
    if (parseInt(element.border.width) === 0) {
      styles.push(`border: none`)
    } else {
      if (element.border.sides.length === 4) {
        styles.push(`border: ${element.border.width}px ${element.border.style} ${element.border.color}`)
      } else {
        for (let side of element.border.sides) {
          styles.push(`border-${side}: ${element.border.width}px ${element.border.style} ${element.border.color}`)
        }
      }
    }
    styles.push(`border-radius: ${element.border.radius[0]}px ${element.border.radius[1]}px ${element.border.radius[2]}px ${element.border.radius[3]}px;`)
  }
  // font
  if (element.font) {
    styles.push(`font-size: ${element.font.size}px`)
    styles.push(`color: ${element.font.color}`)
    styles.push(`text-align: ${element.font.align}`)
    styles.push(`font-weight: ${element.font.weight}`)
    styles.push(`letter-spacing: ${element.font.spacing}px`)
    styles.push(`text-decoration: ${element.font.decoration}px`)
    styles.push(`padding: ${getLength(element.font.padding, device)}px`)
  }
  return styles.join(';')
}

function getGradientStyle (colors, angle, blendImage) {
  let style = `background-image: linear-gradient(${angle}, ${colors.join(',')})`
  if (blendImage) {
    style = style + `, url('${blendImage}')`
  }
  return style
}

function getBackgroundStyle (background) {
  const styles = []
  if (background.mode === '1') { // 颜色与图片混合
    styles.push(`background-color: ${background.color}`)
    if (background.image) {
      styles.push(`background-image: url('${background.image}')`)
    }
  } else if (background.mode === '2') { // 颜色和渐变混合
    styles.push(getGradientStyle(background.gradients, background.angle, background.image))
  } else if (background.mode === '0') {
    if (background.image) {
      styles.push(`background-image: url('${background.image}')`)
    } else {
      styles.push(`background: transparent`)
    }
  }
  styles.push(`background-size: ${background.size}`)
  styles.push(`background-position: ${background.position}`)
  if (background.repeat) {
    styles.push(`background-repeat: repeat`)
  } else {
    styles.push(`background-repeat: no-repeat`)
  }
  styles.push(`background-blend-mode: ${background.blend}`)
  return styles.join(';')
}

function getWorkStyle (work, device) {
  return getBackgroundStyle(work.background)
}

function getSceneStyle (scene, device) {
  const styles = []
  styles.push(getBackgroundStyle(scene.background))
  styles.push(`width: ${device.width}px`)
  styles.push(`height: ${device.height}px`)
  if (scene.type === 'background') {
    styles.push(`z-index: 10`)
  } else if (scene.type === 'foreground') {
    styles.push(`z-index: 500`)
  } else {
    styles.push(`z-index: 100`)
  }
  return styles.join(';')
}

export default {
  getLenSplits,
  getGradientStyle,
  getBackgroundStyle,
  getElementStyle,
  getWorkStyle,
  getSceneStyle
}