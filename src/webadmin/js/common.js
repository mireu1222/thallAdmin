$(function () {
    $('.datepicker input[type=text]').datepicker();
    allChecker();
    toggleCollapse();
    fileRows();
});

// checkbox all check
function allChecker() {
    var obj = '[data-toggle="allChk"]',
        $obj = $(obj);

    if ($obj.length <= 0) return;
    $obj.each(function(){
        var $input = $(this).find('.chk-all'),
            name = $input.attr('name');

        $input.on('change', function(){
            var $name = $(this).attr('name'),
                $wrapper = $(this).parents(obj),
                $childs = $wrapper.find('input[name='+ $name +']');
            
            if ($(this).prop("checked")) {
                $childs.prop("checked", true);
            } else {
                $childs.prop("checked", false);
            }
        });
        
        $('input[name=' + name + ']').each(function () {
            var $this = $(this);
    
            $this.on('change', function () {
                var total = $('input[name=' + name + ']').length;
                var chked = $('input[name=' + name + ']:checked').not($input).length + 1;
                if (chked == total) {
                    $input.prop("checked", true);
                } else {
                    $input.prop("checked", false);
                }
            });
        });
    });
}

// 홍보자료관리 collapse
function toggleCollapse() {
    var tg = $('[data-evt="tg-toggle-wrap"]');

    if( tg.length <= 0 ) return;
    tg.find('.toggle-tg').hide();

    $('[data-toggle="tg-toggle"]').on('click', function(){
        var self = $(this),
            target = self.data('target'),
            wrap = self.parents('[data-evt="tg-toggle-wrap"]'),
            allBtn = wrap.find('[data-toggle="tg-toggle"]'),
            allTarget = wrap.find('.toggle-tg');

        allTarget.hide();
        allBtn.attr('aria-expanded', 'false');

        $(target).show();
        self.attr('aria-expanded', 'true');
    });
}

// multi file upload Row ADD/DELETE
function fileRows() {
    var fileRow = 
        '<div class="d-flex align-items-center file-wrap mt-1">' +
            '<input class="form-control" type="file" id="" name="">' +
            '<button type="button" class="btn btn-danger" data-toggle="row-delete">삭제</button>' +
        '</div>';

    $(document).on('click', '[data-toggle="row-add"]', function(){
        var add = $(this),
            rows = add.parent('.file-wrap'),
            rowSibling = rows.siblings().length,
            wrap = rows.parent('.multi-file-wrap'),
            max = wrap.data('max-count');

        if ( rowSibling + 1 > max - 1 ) {
            alert('최대 '+max+'개까지 첨부 가능합니다.');
            return;
        }

        wrap.append(fileRow);
    });
    $(document).on('click', '[data-toggle="row-delete"]', function(){
        var btn = $(this),
            rows = btn.parent('.file-wrap');

        rows.remove();
    });
}