namespace SpriteKind {
    export const v1 = SpriteKind.create()
    export const projectil_enemy_v1 = SpriteKind.create()
    export const powerup = SpriteKind.create()
    export const mode = SpriteKind.create()
    export const v2 = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . 2 3 1 3 2 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 3 . . . . . . 
        . . . . . 3 1 1 1 2 . . . . . . 
        . . . . . 2 1 1 1 2 . . . . . . 
        . . . . . 2 3 1 3 2 . . . . . . 
        . . . . . . 3 1 3 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 1 2 . . . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        `, mySprite, 0, -200)
    music.play(music.createSoundEffect(WaveShape.Sine, 2292, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    if (Doublefiremode && Doublefiremode.lifespan > 0) {
        projectile.x += 10
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 5 5 5 . . . . . . . 
            . . . . . 5 4 1 4 5 . . . . . . 
            . . . . . 3 5 1 1 4 . . . . . . 
            . . . . . 4 1 1 5 4 . . . . . . 
            . . . . . 4 1 5 1 4 . . . . . . 
            . . . . . 4 4 1 1 5 . . . . . . 
            . . . . . 5 1 4 1 5 . . . . . . 
            . . . . . 5 4 1 4 5 . . . . . . 
            . . . . . . 4 1 4 . . . . . . . 
            . . . . 4 . 5 1 5 . 4 . . . . . 
            . . . . . . 5 1 5 . . . . . . . 
            . . . . . . 5 1 5 . . 4 . . . . 
            . . . . . . 5 5 5 . . . . . . . 
            `, mySprite, 0, -200)
        projectile.x += -5
    }
})
sprites.onOverlap(SpriteKind.v2, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.changeScoreBy(30)
    enemydeath(otherSprite)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.changeScoreBy(5)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    let statusbar: StatusBarSprite = null
    sprites.destroy(statusbar.spriteAttachedTo(), effects.fire, 2000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.v1, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeLifeBy(-3)
    scene.cameraShake(4, 500)
    music.play(music.createSoundEffect(WaveShape.Noise, 2292, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.v2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeLifeBy(-6)
    scene.cameraShake(4, 500)
    music.play(music.createSoundEffect(WaveShape.Noise, 1710, 2556, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
/**
 * enemy v1
 */
sprites.onOverlap(SpriteKind.v1, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.changeScoreBy(15)
    enemydeath(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerup, function (sprite, otherSprite) {
    Doublefiremode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . 2 2 2 . . . . 2 2 2 . . . 
        . . 2 3 1 3 2 . . 2 3 1 3 2 . . 
        . . 3 1 1 1 3 . . 3 1 1 1 3 . . 
        . . 3 1 1 1 3 . . 3 1 1 1 3 . . 
        . . 3 1 1 1 3 . . 3 1 1 1 3 . . 
        . . 3 1 1 1 2 . . 3 1 1 1 2 . . 
        . . 2 1 1 1 2 . . 2 1 1 1 2 . . 
        . . 2 3 1 3 2 . . 2 3 1 3 2 . . 
        . . . 3 1 3 . . . . 3 1 3 . . . 
        . . . 2 1 2 . . . . 2 1 2 . . . 
        . . . 2 1 2 . . . . 2 1 2 . . . 
        . . . 2 1 2 . . . . 2 1 2 . . . 
        . . . 2 2 2 . . . . 2 2 2 . . . 
        `, SpriteKind.mode)
    Doublefiremode.setPosition(45, 7)
    Doublefiremode.lifespan = 5000
    sprites.destroy(otherSprite)
})
function enemydeath (enemy: Sprite) {
    sprites.destroy(enemy, effects.disintegrate, 500)
    if (Math.percentChance(15)) {
        powerup = sprites.create(assets.image`powerup`, SpriteKind.powerup)
        powerup.x = enemy.x
        powerup.y = enemy.y
    }
}
/**
 * kormet zieht mir leben ab
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    info.changeLifeBy(-10)
    scene.cameraShake(4, 500)
    music.play(music.createSoundEffect(WaveShape.Noise, 1221, 18, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
let projectil_enemy_v2: Sprite = null
let enemy_v1: Sprite = null
let projectil_enemy_v1: Sprite = null
let enemy_v2: Sprite = null
let asteroid: Sprite = null
let powerup: Sprite = null
let Doublefiremode: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . d d . . . . . . . 
    . . . . . . . 1 d . . . . . . . 
    . . . . . . . 1 d . . . . . . . 
    . . . . . . . 1 d . . . . . . . 
    . . . . . . . 1 d . . . . . . . 
    . . . . . . . 1 d . . . . . . . 
    . . . . . . . 1 d . . . . . . . 
    . . d . . . . 1 d . . . . d . . 
    . . d . . . 1 1 d d . . . d . . 
    . . d . . . 1 1 d d . . . d . . 
    . . d . . 1 1 1 d 1 1 . . d . . 
    . . d . 1 1 1 1 d d 1 1 . d . . 
    . . 1 1 1 1 1 1 1 d 1 1 1 1 . . 
    . 1 1 1 1 1 1 1 1 d d 1 d 1 1 . 
    1 1 1 1 1 1 1 1 1 1 d d d d 1 1 
    1 1 1 1 1 1 1 1 1 1 1 1 d d d 1 
    `, SpriteKind.Player)
info.setLife(100)
mySprite.setPosition(78, 102)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
music.play(music.stringPlayable("G C G D A - - - ", 120), music.PlaybackMode.InBackground)
game.onUpdateInterval(5000, function () {
    asteroid = sprites.createProjectileFromSide(img`
        . . . . . . . . c c c c . . . . 
        . . . . c c c c c c c c c . . . 
        . . . c f c c a a a a c a c . . 
        . . c c f f f f a a a c a a c . 
        . . c c a f f c a a f f f a a c 
        . . c c a a a a b c f f f a a c 
        . c c c c a c c b a f c a a c c 
        c a f f c c c a b b 6 b b b c c 
        c a f f f f c c c 6 b b b a a c 
        c a a c f f c a 6 6 b b b a a c 
        c c b a a a a b 6 b b a b b a . 
        . c c b b b b b b b a c c b a . 
        . . c c c b c c c b a a b c . . 
        . . . . c b a c c b b b c . . . 
        . . . . c b b a a 6 b c . . . . 
        . . . . . . b 6 6 c c . . . . . 
        `, 0, 50)
    asteroid.x = randint(0, scene.screenWidth())
    asteroid.setKind(SpriteKind.Enemy)
    asteroid.lifespan = 10000
})
game.onUpdateInterval(5000, function () {
    enemy_v2 = sprites.createProjectileFromSide(img`
        . . . . d d d d d d d d . . . . 
        . . . d 7 7 7 7 7 7 7 7 d . . . 
        . . d 7 7 7 7 7 7 7 7 7 7 d . . 
        . d 7 7 7 7 7 7 7 7 7 7 7 7 d . 
        d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d 
        7 7 7 7 c 7 7 7 7 7 7 c 7 7 7 7 
        7 7 7 7 c 7 7 7 7 7 7 c 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d 
        . d 7 7 7 7 7 7 7 7 7 7 7 7 d . 
        . d 7 7 7 7 7 7 7 7 7 7 7 7 d . 
        . d 7 c 7 c 7 7 c 7 7 7 c 7 d . 
        . . d c 7 c 7 7 c 7 7 7 c d . . 
        . . . c . c . . c . . . c . . . 
        . . c . . . c . c . . c . . . . 
        . c . . . c . c . c . . c . . . 
        `, 0, 20)
    enemy_v2.x = randint(0, scene.screenWidth())
    enemy_v2.setKind(SpriteKind.v2)
    enemy_v2.lifespan = 10000
})
game.onUpdateInterval(1000, function () {
    projectil_enemy_v1 = sprites.createProjectileFromSprite(img`
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . . 7 c 7 . . . . . . 
        . . . . . . . 7 c 7 . . . . . . 
        . . . . . . . 7 c 7 . . . . . . 
        . . . . . . . 6 c 6 . . . . . . 
        . . . . . . 7 6 c 6 7 . . . . . 
        . . . . . . 7 c c c 7 . . . . . 
        . . . . . . 7 c c c 6 . . . . . 
        . . . . . . 6 c c c 6 . . . . . 
        . . . . . . 6 c c c 6 . . . . . 
        . . . . . . 6 c c c 6 . . . . . 
        . . . . . . 7 6 c 6 7 . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, enemy_v1, 0, 100)
    projectil_enemy_v1.setKind(SpriteKind.v1)
    projectil_enemy_v1.lifespan = 10000
})
game.onUpdateInterval(1000, function () {
    projectil_enemy_v2 = sprites.createProjectileFromSprite(img`
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . . 7 c 7 . . . . . . 
        . . . . . . . 7 c 7 . . . . . . 
        . . . . . . . 7 c 7 . . . . . . 
        . . . . . . . 6 c 6 . . . . . . 
        . . . . . . 7 6 c 6 7 . . . . . 
        . . . . . . 7 c c c 7 . . . . . 
        . . . . . . 7 c c c 6 . . . . . 
        . . . . . . 6 c c c 6 . . . . . 
        . . . . . . 6 c c c 6 . . . . . 
        . . . . . . 6 c c c 6 . . . . . 
        . . . . . . 7 6 c 6 7 . . . . . 
        . . . . . . . 7 7 7 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, enemy_v2, 0, 100)
    projectil_enemy_v2.setKind(SpriteKind.v2)
    projectil_enemy_v2.lifespan = 10000
})
game.onUpdateInterval(1500, function () {
    enemy_v1 = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . a . . . . . . . . . . . . a . 
        . a a . . . . . . . . . . a a . 
        . a a a a a a a a a a a a a a . 
        a a d c d c d c d c d c d c d a 
        . a c c d c d c d c d c d c a . 
        a a a c d c d c d c d c c a a a 
        . . . a c c d c d c c c a . . . 
        . . . . a c c c d c c a . . . . 
        . . . . . a a c c a a . . . . . 
        . . . . . . . a a . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 20)
    enemy_v1.x = randint(0, scene.screenWidth())
    enemy_v1.setKind(SpriteKind.v1)
    enemy_v1.lifespan = 10000
})
