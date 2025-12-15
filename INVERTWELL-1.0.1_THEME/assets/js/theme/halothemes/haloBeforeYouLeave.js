import utils from '@bigcommerce/stencil-utils';
import 'slick-carousel';
import swal from '../global/sweet-alert';
import Cart from '../cart';

export default function(context){

	function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
   }

   function getCookie(cname) {
      const name = cname + '=';
      const ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) === ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
         }
      }
      return '';
   }

   const deleteCookie = function(name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   };

	var BC_Products = function() {
	    var e = {
	        howManyToShow: 3,
	        howManyToStoreInMemory: 10,
	        wrapperId: "history-products",
	        onComplete: null
	    };
	    var t = [];
	    var n = null;
	    var r = null;
	    var i = 0;
	    var s = {
	        configuration: {
	            expires: context.themeSettings.before_you_leave_history_expires_date,
	            path: "/",
	            domain: window.location.hostname
	        },
	        name: "bigcommerce_history",
	        write: function(e) {
	            setCookie(this.name, e.join(" "), this.configuration.expires)
	        },
	        read: function() {
	            var e = [];
	            var t = getCookie(this.name);
	            if (t !== null && t != undefined) {
	                e = t.split(" ")
	            }
	            return e
	        },
	        destroy: function() {
	            setCookie(this.name, null, this.configuration.expires)
	        },
	        remove: function(e) {
	            var t = this.read();
	            var n = $.inArray(e, t);
	            if (n !== -1) {
	                t.splice(n, 1);
	                this.write(t)
	            }
	        }
	    };
	    var o = function() {
	    	for ( var j = 0; j < e.howManyToShow; j++) {
	    		var productId = t[j];
	    		jQuery('#history-products-list-tmp').find('.productCarousel-slide[data-id="product-'+productId+'"]').appendTo(n);
	    	}
	    	jQuery('#history-products-list-tmp').remove();
	        n.show();
	        if (e.onComplete) {
	            try {
	                e.onComplete()
	            } catch (t) {}
	        }
	    };
	    var u = function() {
	    	var tmp = jQuery('#history-products-list-tmp');
	    	var unique = (function(t){
			  var m = {}, unique = []
			  for (var i=0; i<t.length; i++) {
			    var v = t[i];
			    if (!m[v]) {
			      unique.push(v);
			      m[v]=true;
			    }
			  }
			  return unique;
			})(t);

	    	for ( var j = 0; j < e.howManyToShow; j++) {
	    		var productId = t[j];
	    		utils.api.product.getById(productId, { template: 'halothemes/halo-before-you-leave-tmp' }, (err, response) => {
		            if (err) {
		                return false;
		            }

		            $(response).appendTo(tmp);
		            i++;
                	if(i >= e.howManyToShow){
                		o();
                	}
		        });
	    	}
	        
	    };
	    return {
	        resizeImage: function(e, t) {
	            if (t == null) {
	                return e
	            }
	            if (t == "master") {
	                return e.replace(/http(s)?:/, "")
	            }
	            var n = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?/i);
	            if (n != null && n != undefined) {
	                var r = e.split(n[0]);
	                var i = n[0];
	                return (r[0] + "_" + t + i).replace(/http(s)?:/, "")
	            } else {
	                return null
	            }
	        },
	        showHistory: function(i) {
	            var i = i || {};
	            jQuery.extend(e, i);
	            t = s.read();
	            n = jQuery("#" + e.wrapperId);
	            e.howManyToShow = Math.min(t.length, e.howManyToShow);
	            
	            if (e.howManyToShow && n.length) {
	                u()
	            }
	        },
	        getConfig: function() {
	            return e
	        },
	        clearList: function() {
	            s.destroy()
	        },
	        recordHistory: function(t) {
	            var t = t || {};
	            var product_id = $('.productView').find('form[data-cart-item-add] [name="product_id"]').val();
	            
	            jQuery.extend(e, t);
	            var n = s.read();
	            
	            if (product_id) {
	                var r = product_id;
	                var i = jQuery.inArray(r, n);
	                if (i === -1) {
	                    n.unshift(r);
	                    n = n.splice(0, e.howManyToStoreInMemory)
	                } else {
	                    n.splice(i, 1);
	                    n.unshift(r)
	                }
	                s.write(n)
	            }
	        }
	    }
	}();
	
	// Before You Leave 
	function ProductsCarousel(tab) {
		if(!tab.hasClass('slick-slider')) {
	        tab.slick({
	            dots: true,
	            arrows: true,
	            slidesToShow: 1,
	            slidesToScroll: 1,
	            slidesPerRow: 1,
                rows: 1,
	            mobileFirst: true,
	            infinite: false,
	            responsive: [
	            {
	              breakpoint: 1024,
	              settings: {
	                slidesPerRow: 1,
                    rows: 3
	              }
	            },
	            {
	              breakpoint: 767,
	              settings: {
	                slidesPerRow: 1,
                    rows: 2
	              }
	            }
	          ]
	        });
	    }
	}

    function beforeYouLeave() {
        var beforeYouLeave_time = parseInt($('#before-you-leave').data("time")) * 60 * 1000;
        var beforeYouLeave = $("#before-you-leave");

        var productLoadTime = beforeYouLeave_time/2;

 		if (beforeYouLeave_time < 2) {
        	beforeYouLeave_time = beforeYouLeave_time + 100;
        }

        if (!$(beforeYouLeave).length) {
            return;
        } else {
        	var idleTime = 0;

	        $(document).ready(function () {
	            setTimeout(function(){
	            	recommendedProducts();
                	historyProducts();
	            }, productLoadTime);

	            var slickInterval = setInterval(function() {
	            	timerIncrement();	            	
	            }, beforeYouLeave_time + 1000);
	        });
	        
	        $(document).on('mousemove', function() {
	        	resetTimer();
	        });

	        $(document).on('keydown', function() {
	        	resetTimer();
	        });

	        $(document).on('scroll', function() {
	        	resetTimer();
	        });
        }
        
        function timerIncrement() {
            idleTime = idleTime + 1;
            if (idleTime >= 1 && !$('body.halo-open-before-you-leave').length ) {
                if (!$('body.halo-open-before-you-leave').length) {
            		var tab = $('#tab-recommended .productGrid');

	                $('body').addClass('halo-open-before-you-leave');
	                ProductsCarousel(tab);
            	}
            }
        }

        function resetTimer() {
            idleTime = -1;
        }

        function recommendedProducts() {
            var productIDS = context.themeSettings.before_you_leave_recommended_id;
            var listIDs = JSON.parse("[" + productIDS + "]");
            var count = listIDs.length;
            var tab = $('#tab-recommended .productGrid');
  
            for (var i = 0; i < listIDs.length; i++) {
                 var productId = listIDs[i];
                 if ($('#before-you-leave #tab-recommended').length) {
                   if ($('#before-you-leave #tab-recommended .productGrid .productCarousel-slide').length <= i) {
                        utils.api.product.getById(productId, { template: 'halothemes/halo-before-you-leave-tmp' }, (err, response) => {
                        	let hasProd = $(response).find('.card').data('product-id');

                        	if(hasProd != undefined && hasProd != '' && hasProd != null && !$(response).find('.page-content--err').length) {
	                            $('#before-you-leave #tab-recommended .productGrid').append($(response));
	                            $('#before-you-leave .before-you-leave-tab .recommended .count').html(count);
	                        }
                        });
                   } else {
                   	return;
                   }
                }
            }
        }

        $(document).on('click','#before-you-leave .halo-close',function(){
           resetSearchForm();
        });

        $('.before-you-leave-continue').on('click', function(e) {
            resetSearchForm();
        });

        $('.halo-overlay-background').on('click', function(e) {
            resetSearchForm();
        });

        $("#before-you-leave .before-you-leave-tab .tab").on("click", function() {
			var tabId= $(this).data('id');
	    	var tab = $(".before-you-leave-tab .tabs-contents #tab-"+tabId+" .productGrid");
	    	setTimeout(function(){ProductsCarousel(tab)},10);
	    	
	    });
    }

    function resetSearchForm() {
    	if ($('body').hasClass('halo-open-before-you-leave')) {
            $('body').removeClass('halo-open-before-you-leave');
            $('#quickSearch2 #search_query2').val('');
        	$('#quickSearch2 .quickSearchResults').empty();
        }
        $('.before-you-leave-tab .search .search-icon').removeClass('is-open');
        $('.before-you-leave-tab').removeClass('has-search-dropdown');
        $('#quickSearch2').removeClass('is-open');
    }

    function historyProducts(){
        BC_Products.recordHistory();
		var cookieValue = getCookie("bigcommerce_history");

		if (!(cookieValue !== null && cookieValue !== undefined && cookieValue !== "")) {
		    $('#tab-history').find(".no-products").show();
		    $('#history-products-list').css("padding", "0");
		    $('#before-you-leave .before-you-leave-tab .history .count').html(0);
		}
		else {
			BC_Products.showHistory({
			    howManyToShow: context.themeSettings.before_you_leave_history_count,
			    howManyToStoreInMemory: context.themeSettings.before_you_leave_history_count,
			    wrapperId: 'history-products-list',
			    onComplete: function() {
			        //start
			        var historyBlock = $('#tab-history');
			        var historyGrid = historyBlock.find('.productGrid');
			        var historyGridInner = historyBlock.find('.productGrid .productGridInner');
			        var historyGridInner = historyGridInner.children();
			        historyGrid.find(".no-products").remove();
			        
			        var count = historyBlock.find('.productGrid .productCarousel-slide').length;
			        $('#before-you-leave .before-you-leave-tab .history .count').html(count);
			        var tab = $('#tab-history .productGrid');
			    }
			});
		}	
	}

	beforeYouLeave();
}
