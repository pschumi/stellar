#
# This controller only handles a single task: rendering orders in XML format using Builder.
# OrderExportJob objects call #render to render the show action.
#
class Admin::OrderExportsController < AdminController

  # GET /admin/order_exports/1.xml
  def show
    respond_to do |format|
      format.xml
    end
  end
end
