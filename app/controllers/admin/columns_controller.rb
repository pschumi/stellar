#encoding: utf-8

class Admin::ColumnsController < ApplicationController

  before_action :authenticate_user!
  before_action :set_column

  authority_actions modify: 'update'

  # No layout, this controller never renders HTML.

  # GET /admin/columns/1/edit.js
  def edit
    authorize_action_for @column, at: current_store

    respond_to :js
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_column
      @column = Column.joins(:section).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def column_params
      params.require(:column).permit(
        :alignment, :pivot, :background_color
      )
    end
end
