function partnerController(partnerService) {

    this.partnerService = partnerService;


    this.load = () => {
        this.partnerService.getAll().then((res) => {
            this.partners = res.data;
        });
    };

    this.load();


    $(document).ready(function() {
        $('.slider').slider({
            full_width: true
        });

        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });

        $(".button-collapse").sideNav();

        $(".card").mouseenter(function(e) {
            if ($(this).find('> .card-reveal').length) {
                if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
                    // Make Reveal animate up
                    $(this).find('.card-reveal').css({
                        display: 'block'
                    }).velocity("stop", false).velocity({
                        translateY: '-100%'
                    }, {
                        duration: 300,
                        queue: false,
                        easing: 'easeInOutQuad'
                    });
                }
            }

            $('.card-reveal').closest('.card').css('overflow', 'hidden');

        });

        $(".card").mouseleave(function() {
            // Make Reveal animate down and display none
            $(this).find('.card-reveal').velocity({
                translateY: 0
            }, {
                duration: 225,
                queue: false,
                easing: 'easeInOutQuad',
                complete: function() {
                    $(this).css({
                        display: 'none'
                    });
                }
            });
        });

    });
}
