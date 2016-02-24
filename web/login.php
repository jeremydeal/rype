<?php
require_once('api/includes/init.php');
$db = getDB();

if($session->is_logged_in()) {
    if($session->user_type == 3) {
        ?>
        <script type="text/javascript">
            $(document).ready(function() {
                var right = $('div#right-viewport').find('div.slim-scroll');

                // load the navbar and viewports, based on user_type
                $('#navbar').load('view_admin_navbar.php');
                right.load('view_personal_right.php');
            });
        </script>
    <?php } elseif($session->user_type == 2) { ?>
        <script type="text/javascript">
            $(document).ready(function() {
                var left = $('div#left-viewport').find('div.slim-scroll');
                var right = $('div#right-viewport').find('div.slim-scroll');

                $('#navbar').load('view_supervisor_navbar.php');
                right.load('view_personal_right.php');
            });
        </script>
    <?php } elseif($session->user_type == 1) { ?>
        <script type="text/javascript">
            $(document).ready(function() {
                var left = $('div#left-viewport').find('div.slim-scroll');
                var right = $('div#right-viewport').find('div.slim-scroll');

                $('#navbar').load('view_mentor_navbar.php');
                right.load('view_personal_right.php');
            });
        </script>
        <?php
    } // end if(user_type == 1)
} // end if(logged_in)
?>

    <h1>Login</h1>
    <div class="message"></div>
    <form id="login" accept-charset="UTF-8">
        <table>
            <tr>
                <td><label for="username">Username</label></td>
                <td><input type="text" id="username"/></td>
            </tr>
            <tr>
                <td><label for="password">Password</label></td>
                <td><input type="password" id="password"/></td>
            </tr>
            <tr>
                <td class="submit" colspan="2"><input type="submit" name="submit" value="Submit"/></td>
            </tr>
        </table>
    </form>

    <script>
        $(document).ready(function(){
            $("#login").submit(function(e){
                e.preventDefault();

                var username = $("#username").val();
                var password = $("#password").val();
                var data = "username="+username+"&password="+password;

                // var data = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url: "ajax_login.php",
                    data: data,
                    dataType: 'text',
                    cache: false,
                    success: function(output){
                        output = JSON.parse(output);
                        if (output.err !== undefined) {
                            // create a div to display error messages
                            $('#right-viewport').find('div.message').html(output.err);
                            // if error, clear password but leave username
                            $('#password').val('');
                        } else {
                            var left = $('#left-viewport').find('.slim-scroll');
                            var right = $('#right-viewport').find('.slim-scroll');

                            // load the navbar and viewports, based on user_type
                            if(output.user_type == 3) {
                                $('#navbar').load('view_admin_navbar.php');
                                right.load('view_personal_right.php');
                            } else if (output.user_type == 2) {
                                $('#navbar').load('view_supervisor_navbar.php');
                                right.load('view_personal_right.php');
                            } else if (output.user_type == 1) {
                                $('#navbar').load('view_mentor_navbar.php');
                                right.load('view_personal_right.php');
                            }
                        } // end if
                    } // end success function
                }).fail(function( jqXHR, textStatus ) {
                    alert(jqXHR+" presented with the following error: "+textStatus);
                }); // end ajax call
                return false;
            }); // end form submission function
        });
    </script>

<?php
$db->close_connection();
?>