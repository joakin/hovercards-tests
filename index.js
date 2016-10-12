
function main () {

  const staging = process.env.TEST_URL || 'http://reading-web-staging.wmflabs.org/w/index.php?title=Main_Page&mobileaction=toggle_view_desktop'
  const testLink = 'a[href="/wiki/Test"],a[href="/w/index.php/Test"]'
  const testLink2 = 'a[href="/wiki/Test2"],a[href="/w/index.php/Test2"]'
  const hovercard = '.mwe-popups a.mwe-popups-extract, .mwe-popups a.mwe-popups-discreet'

  console.log('Running for', staging );
  /**/
  test('Hover and wait for card', _ => [
    visit(staging),
    hover(testLink),
    waitForHovercard,
    hoverout(testLink)
  ], [
    'pageLoaded',
    'dismissed'
  ])

  test('Quick/accidental hover', _ => [
    visit(staging),
    hover(testLink),
    wait(10),
    hoverout(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned'
  ])

  test('Longer quick/accidental hover', _ => [
    visit(staging),
    hover(testLink),
    wait(350),
    hoverout(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned'
  ])

  test('Longer hover + out + long hover', _ => [
    visit(staging),
    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink),
    waitForHovercard,
    hoverout(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'dismissed'
  ])

  test('Hover link + click', _ => [
    visit(staging),
    hover(testLink),
    wait(10),
    click(testLink)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Hover link + wait for hovercard + click', _ => [
    visit(staging),
    hover(testLink),
    waitForHovercard,
    click(testLink)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Hover link 1 + click link 2', _ => [
    visit(staging),
    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink2),
    wait(10),
    click(testLink2)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Hover link + out + hover back + click', _ => [
    visit(staging),

    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  // PROBLEMATIC: Fails if pauses are less than 400-500ms sometimes
  test('Hover link + out + hover back & wait + out + click', _ => [
    visit(staging),

    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink),
    waitForHovercard,
    hoverout(testLink),

    relax,

    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'dismissed',
    'opened in same tab',
    'pageLoaded'
  ])

  // PROBLEMATIC: Fails if pauses are less than 500ms sometimes
  test('Multiple hover link 1 & 2 + click link 2', _ => [
    visit(staging),

    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink2),
    waitForHovercard,
    hoverout(testLink2),

    relax,

    hover(testLink),
    waitForHovercard,
    hoverout(testLink),

    relax,

    hover(testLink2),
    wait(350),
    hoverout(testLink2),

    relax,

    hover(testLink2),
    click(testLink2)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'dismissed',
    'dismissed',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  test('With hovercards disabled, clicking on a link tracks it', _ => [
    visit(staging, {disabled: true}),
    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded',
  ])

  test('With hovercards disabled, hovering & out + clicking on a link tracks it', _ => [
    visit(staging, {disabled: true}),
    hover(testLink),
    wait(600),
    hoverout(testLink),

    relax,

    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded',
  ])

  test('Hover link + click', _ => [
    visit(staging),
    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Enabled: Hover link + click', _ => [
    visit(staging),
    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Disabled: Hover link + click', _ => [
    visit(staging, {disabled: true}),
    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Enabled: Hover link + out + click', _ => [
    visit(staging),
    hover(testLink),
    wait(150),
    hoverout(testLink),
    wait(150),
    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  // Bug found
  test('Disabled: Hover link + out + click', _ => [
    visit(staging, {disabled: true}),
    hover(testLink),
    wait(150),
    hoverout(testLink),
    wait(150),
    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Disabled: (Hover link + out)*3 + click', _ => [
    visit(staging, {disabled: true}),

    hover(testLink),
    wait(150),
    hoverout(testLink),
    wait(150),

    hover(testLink),
    wait(150),
    hoverout(testLink),
    wait(150),

    hover(testLink),
    wait(150),
    hoverout(testLink),
    wait(150),

    hover(testLink),
    click(testLink)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'dwelledButAbandoned',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])


  /* Clicking tests with clicking the hovercard */


  test('Hover link + wait for hovercard + click hovercard', _ => [
    visit(staging),
    hover(testLink),
    waitForHovercard,
    click(hovercard)
  ], [
    'pageLoaded',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Quick hover link 1 + hover link 2 + click hovercard', _ => [
    visit(staging),
    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink2),
    waitForHovercard,
    click(hovercard)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  test('Hover link + out + hover back + click hovercard', _ => [
    visit(staging),

    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink),
    waitForHovercard,
    click(hovercard)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])


  // PROBLEMATIC: Fails if pauses are less than 400-500ms sometimes
  test('Hover link + out + hover back & wait + out + hover back & wait & click hovercard', _ => [
    visit(staging),

    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink),
    waitForHovercard,
    hoverout(testLink),

    relax,

    hover(testLink),
    waitForHovercard,
    click(hovercard)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'dismissed',
    'opened in same tab',
    'pageLoaded'
  ])

  // PROBLEMATIC: Fails if pauses are less than 500ms sometimes
  test('Multiple hover link 1 & 2 + hover 2 & click hovercard', _ => [
    visit(staging),

    hover(testLink),
    wait(350),
    hoverout(testLink),

    relax,

    hover(testLink2),
    waitForHovercard,
    hoverout(testLink2),

    relax,

    hover(testLink),
    waitForHovercard,
    hoverout(testLink),

    relax,

    hover(testLink2),
    wait(350),
    hoverout(testLink2),

    relax,

    hover(testLink2),
    waitForHovercard,
    click(hovercard)
  ], [
    'pageLoaded',
    'dwelledButAbandoned',
    'dismissed',
    'dismissed',
    'dwelledButAbandoned',
    'opened in same tab',
    'pageLoaded'
  ])

  /*
  */
}

function setup ({initFromStorage, disabled}) {
  return (n) => 
    n.evaluate((initFromStorage, disabled) => {
      window.log = initFromStorage ? (JSON.parse(localStorage.getItem('log')) || []) : []
      window.mw.trackSubscribe('event', (schema, e) => {
        window.log.push([e.action, JSON.stringify(e)])
        localStorage.setItem('log', JSON.stringify(window.log))
      });
      (function tilReady () {
        if (window.mw.loader.getState('ext.popups.core') === 'ready') {
          window.mw.popups.saveEnabledState( !disabled )
          window.mw.popups.getEnabledState = function () { return !disabled }
          window.mw.popups.enabled = !disabled
        } else {
          setTimeout(tilReady, 10)
        }
      })()
    }, initFromStorage, disabled)
}
function hover (link) { return (n) => n.mouseover(link) }
function hoverout (link) { return (n) => n.evaluate(mouseout, link) }
function click (link) { return (n) => setup({initFromStorage: true})(n.click(link)) }
function waitForHovercard (n) {
  return n.wait('.mwe-popups').wait(() =>
    document.querySelector('.mwe-popups').style.display === 'block')
}
function visit (url, opts) { return (n) => setup(opts || {})(n.goto(url)) }
function wait (t) { return (n) => n.wait(t || 10) }
function relax (n) { return wait(500)(n) }

function mouseout(selector) {
  var element = document.querySelector(selector)
  if (!element) {
    throw new Error('Unable to find element by selector: ' + selector);
  }
  var event = document.createEvent('MouseEvent')
  event.initMouseEvent('mouseout', true, true)
  element.dispatchEvent(event)
}

const Nightmare = require('nightmare');

function newBrowser () {
  return Nightmare({ show: false })
    .on('page', (type, message, stack) => console.log('PAGE:', type, message, stack))
}

var lastTest
function test (name, steps, expected) {
  let tmp
  lastTest = (lastTest || Promise.resolve()).then(() =>
    steps().reduce((prev, step) => step(prev), newBrowser())
      .wait(2000)
      .evaluate(() => window.log)
      .end()
      .then((log) => {
        console.log(`\n\n## ${name}\n`)
        console.log(`### Steps\n`)
        console.log(
          (tmp = steps.toString().split('\n'))
            .filter(l => !!l.trim() && l.trim() !== '_ => [' && l.trim() !== ']')
            .map(l => l.trim().replace(/^/g, '1. ').replace(/,$/g, ''))
            .join('\n')
        )
        console.log(`\n### Results\n`)
        log.forEach(([action, event], i) =>
          console.log('*', expected[i] === action ? '✅ ' : `❌  expected ${expected[i]}, got`, action))
        expected.slice(log.length).forEach((action) =>
          console.log(`* ❌  expected ${action}, got nothing`))
        if (expected.length === 0 && log.length === 0)
          console.log('* ✅  expected nothing, got nothing')
        // console.log('\nEvents\n')
        // log.forEach(([action, event]) => {
        //   let {totalInteractionTime, linkInteractionToken, sessionToken}
        //     = JSON.parse(event)

        //   console.dir({
        //     action,
        //     totalInteractionTime,
        //     sessionToken,
        //     linkInteractionToken
        //   })
        // })
      })
      .catch((error) => console.error('Test failed:', error))
  )
}

main()
