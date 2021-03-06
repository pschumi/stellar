class Admin::ColumnsController < AdminController

  before_action :set_column, except: [:create]

  authority_actions settings: 'update', modify: 'update'

  # GET /admin/columns/1/settings.js
  def settings
    authorize_action_for @column, at: current_store

    respond_to :js
  end

  # POST /admin/sections/1/columns.js
  def create
    @section = Section.find(params[:section_id])
    return head :bad_request if @section.remaining_span < 1
    authorize_action_for @section, at: current_store
    @column = @section.columns.build(@section.new_column_attributes)

    respond_to do |format|
      if @column.save
        @column.segments.create(Segment.default_settings)
        track @column, @column.section.page
        format.js { render :create }
      else
        format.json { render json: @column.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/columns/1.js
  def update
    authorize_action_for @column, at: current_store

    respond_to do |format|
      if @column.update(column_params)
        format.js
      else
        format.js { render json: @column.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/columns/1/modify.js
  def modify
    @column.update(column_params)
    respond_to :js
  end

  # DELETE /admin/columns/1.js
  def destroy
    authorize_action_for @column, at: current_store

    respond_to do |format|
      if @column.destroy
        format.js
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_column
    @column = Column.joins(:section).find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def column_params
    params.fetch(:column, {}).permit(
      :span_xs, :span_sm, :alignment, :viewport, :pivot, :background_color,
      :gradient_color, :gradient_type, :gradient_direction, :gradient_balance
    )
  end
end
