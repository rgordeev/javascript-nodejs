# Мышь: колёсико, событие wheel

Колёсико мыши используется редко. Оно есть даже не у всех мышей. Поэтому существуют пользователи, которые в принципе не могут сгенерировать такое событие.

...Но, тем не менее, его использование может быть оправдано. Например, можно добавить дополнительные удобства для тех, у кого колёсико есть.
[cut]
## Отличия колёсика от прокрутки 

Несмотря на то, что колёсико мыши обычно ассоциируется с прокруткой, это совсем разные вещи.

<ul>
<li>При прокрутке срабатывает событие [onscroll](article:380) -- рассмотрим его в дальнейшем. Оно произойдёт *при любой прокрутке*, в том числе через клавиатурy, но *только на прокручиваемых элементах*. Например, элемент с `overflow: hidden` в принципе не может сгенерировать `onscroll`.</li>
<li>А событие `wheel` является чисто "мышиным". Оно генерируется *над любым элементом* при передвижении колеса мыши. При этом не важно, прокручиваемый он или нет. В частности, `overflow:hidden` никак не препятствует обработке колеса мыши.</li>
</ul>

Кроме того, событие `onscroll` происходит после прокрутки, а `onwheel` -- до прокрутки, поэтому в нём можно отменить саму прокрутку (действие браузера).

## Зоопарк `wheel` в разных браузерах

Событие `wheel` появилось в [стандарте](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-wheel) не так давно. Оно поддерживается IE9+, Firefox 17+. Возможно, другими браузерами на момент чтения этой статьи.

До него браузеры обрабатывали прокрутку при помощи событий [mousewheel](http://msdn.microsoft.com/en-us/library/ie/ms536951.aspx) (все кроме Firefox) и [DOMMouseScroll](https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/DOMMouseScroll), [MozMousePixelScroll](https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/MozMousePixelScroll) (только Firefox).

Самые важные свойства современного события и его нестандартных аналогов:
<dl>
<dt>`wheel`</dt>
<dd>Свойство `deltaY` -- количество прокрученных пикселей по горизонтали и вертикали. Существуют также свойства `deltaX` и `deltaZ` для других направлений прокрутки.</dd>
<dt>`MozMousePixelScroll`</dt>
<dd>Срабатывает, начиная с Firefox 3.5, только в Firefox. Даёт возможность отменить прокрутку и получить размер в пикселях через свойство `detail`, ось прокрутки в свойстве `axis`.</dd>
<dt>`DOMMouseScroll`</dt>
<dd>Существует в Firefox очень давно, отличается от предыдущего тем, что даёт в `detail` количество строк. Если не нужна поддержка Firefox < 3.5, то не нужно и это событие.</dd>
<dt>`mousewheel`</dd>
<dd>Срабатывает в браузерах, которые ещё не реализовали `wheel`. В свойстве `wheelDelta` -- условный "размер прокрутки", обычно равен `120` для прокрутки вверх и `-120` -- вниз. Он не соответствует какому-либо конкретному количеству пикселей.</dd>
</dl>

Чтобы кросс-браузерно отловить прокрутку и, при необходимости, отменить её, можно использовать все эти события.

Пример:
[js]
if (elem.addEventListener) {
  if ('onwheel' in document) {
    // IE9+, FF17+
    elem.addEventListener ("wheel", onWheel, false);
  } else if ('onmousewheel' in document) {
    // устаревший вариант события
    elem.addEventListener ("mousewheel", onWheel, false);
  } else {
    // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
    elem.addEventListener ("MozMousePixelScroll", onWheel, false);
  }
} else { // IE<9
  elem.attachEvent ("onmousewheel", onWheel);
}

function onWheel(e) {
  e = e || window.event;

  // wheelDelta не дает возможность узнать количество пикселей
  var delta = e.deltaY || e.detail || e.wheelDelta;

  var info = document.getElementById('delta');

  info.innerHTML = +info.innerHTML + delta;

  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}
[/js]

В действии: 
[iframe src="wheel" link play]

[warn header="Ошибка в IE8"]

В браузере IE8 (только версия 8) есть ошибка. При наличии обработчика `mousewheel` --  элемент не скроллится. Иначе говоря, действие браузера отменяется по умолчанию.

Это, конечно, не имеет значения, если элемент в принципе не прокручиваемый.
[/warn]

[task id=933]
[task id=997]
[head]
<link rel="stylesheet" type="text/css" href="/files/tutorial/browser/events/mouse.css"/>
<script src="/files/tutorial/browser/events/log.js"></script>

<script type="text/javascript">
function highlightMe(elem) {
    elem.style.backgroundColor='yellow'
    alert(elem.className)
    elem.style.backgroundColor = ''
}

function highlightMe2(e) {
    highlightMe(e.currentTarget);
}
</script>
[/head]