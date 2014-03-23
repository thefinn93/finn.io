function update(timeout) {
    $.get("/status/status.json").success(function(hosts) {
        console.log(hosts);
        $(".dashboard").text("");
        for(host in hosts) {
            if(hosts.hasOwnProperty(host)) {
                var hostbox = $("<div>")
                    .attr("id", host)
                    .addClass("host")
                    .addClass(host)
                    .append("<b>" + host + "</b>");
                for(service in hosts[host]) {
                    if(hosts[host].hasOwnProperty(service)) {
                        console.log("Setting up box for ", host, service);
                        var servicebox = $("<div>")
                            .attr("id", host + "-" + service)
                            .addClass("service")
                            .addClass(host)
                            .addClass(service)
                            .text(service)
                            .attr("title", hosts[host][service]['plugin_output']);
                        switch(hosts[host][service]['current_state']) {
                            case "0":
                                servicebox.addClass("status-okay");
                                break;
                            case "1":
                                servicebox.addClass("status-warning");
                                break;
                            case "2":
                                servicebox.addClass("status-critical");
                                break;
                            default:
                                servicebox.addClass("status-unknown");
                                break;
                        }
                        hostbox.append(servicebox);
                    }
                }
                $(".dashboard").append(hostbox);
                if(updatetime > 5000) {
                    updatetime = updatetime/2;
                }
                if(updatetime < 5000) {
                    updatetime = 5000;
                }
                setTimeout(update, updatetime);
            }
        }
    }).error(function() {
        $(".dashboard").text("Failed to connect to the status server. That could be a problem");
        updatetime = updatetime*2;
        setTimeout(update, updatetime);
    })
}

$(document).ready(function() {
    $(".dashboard").text("Connecting to status server...");
    updatetime = 5000;
    update();
})
